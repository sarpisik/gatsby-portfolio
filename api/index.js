const {
  SANITY_PROJECT_ID: projectId,
  SANITY_PROJECT_DATASET: dataset,
  SANITY_TOKEN: token,
  EMAIL_HOST: host,
  EMAIL_AUTH_USER: user,
  EMAIL_AUTH_PASSWORD: pass,
  EMAIL_SENDER: from,
  EMAIL_RECEIVER: to,
} = process.env

const sanityClient = require("@sanity/client")({
  projectId,
  dataset,
  token,
})

const { isEmail, isAlpha, isEmpty, normalizeEmail, trim } = require("validator")

const nodemailer = require("nodemailer")
// Custom mail auth config.
const auth = {
  user,
  pass,
}
// Create reusable transporter object using SMTP transport.
const transporter = nodemailer.createTransport({
  host,
  port: 465,
  secure: true,
  auth,
})
// Verify the auth credentials
transporter.verify(error =>
  error
    ? console.error(error)
    : console.log("Server is ready to take our texts")
)

module.exports = ({ body: { name, email, text } }, res) => {
  const isEmailInvalid = !isEmail(email)
  const isNameInvalid = !isAlpha(name, "tr-TR")
  const isTextInvalid = isEmpty(text)

  // If the inputs are invalid, respond error.
  // Else, register message.
  if (isEmailInvalid || isNameInvalid || isTextInvalid) {
    res.status(500).send({
      type: "validation",
      email: isEmailInvalid,
      name: isNameInvalid,
      text: isTextInvalid,
    })
  } else {
    // Normalize inputs
    const textSenderEmail = normalizeEmail(email).trim(email)
    const textSenderName = trim(name)
    const textSenderMessage = trim(text)

    // Setup e-mail data.
    const options = {
      from,
      to,
      subject: "New Message",
      html:
        "Message from: " +
        textSenderName +
        "<br></br> Email: " +
        textSenderEmail +
        "<br></br> Message: " +
        textSenderMessage,
    }

    // Send e-mail
    transporter.sendMail(options, (error, _info) => {
      // If e-mail sent succeed, register new message to sanity db.
      // Else send error.
      error && console.error("error on sending mail. ", error)

      if (error)
        return res.status(500).send({ error, type: "Failed on sending email." })

      sanityClient
        .create({ _type: "text", name, email, text })
        // Register sent success.
        .then(
          res.status(200).send({
            type: "success",
            text: `Message has been sent.`,
          })
        )
        // Email sent succeed but registering failed.
        .catch(
          error => (
            console.error("error on registering message data. ", error),
            res
              .status(500)
              .send({ error, type: "Failed on registering email to db." })
          )
        )
    })
  }
}
