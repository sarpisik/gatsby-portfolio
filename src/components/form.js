import React, { Fragment, useState } from "react"
import useForm from "react-hook-form"
import axios from "axios"

const buttonStyle = { paddingTop: "2em" }

const FeedBack = ({ color, text }) => <span style={{ color }}>{text}</span>

const ErrorFeedBack = props => <FeedBack color="#dc3545" {...props} />

const Form = () => {
  // Form state
  const [form, setForm] = useState({ isLoading: false, result: "" }),
    // Inputs state
    { register, handleSubmit, errors } = useForm(),
    // Submit handler
    onSubmit = data => {
      // Display loading.
      setForm({ ...form, isLoading: true })

      // Post new message.
      axios
        .post("/api", data)
        .then(() => setForm({ ...form, isLoading: false, result: "success" }))
        .catch(error => {
          console.error(error)
          setForm({ ...form, isLoading: false, result: "fail" })
        })
    }

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row gtr-uniform gtr-50">
          <div className="col-12">
            {form.isLoading && (
              <FeedBack
                color="#17a2b8"
                text="Your message sending, please wait..."
              />
            )}
            {form.result === "success" ? (
              <FeedBack color="#49bf9d" text="Your message has been sent!" />
            ) : form.result === "fail" ? (
              <ErrorFeedBack text="Message sent failed! Please try again later." />
            ) : null}
          </div>
          <div className="col-6 col-12-xsmall">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              ref={register({ required: true, minLength: 2, maxLength: 20 })}
            />
            {errors.name && errors.name.type === "required" && (
              <ErrorFeedBack text="Name is required." />
            )}
            {errors.name && errors.name.type === "minLength" && (
              <ErrorFeedBack text="Name must has minimum 2 length." />
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <ErrorFeedBack text="Name must has maximum 20 length." />
            )}
          </div>
          <div className="col-6 col-12-xsmall">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              ref={register({ required: true, minLength: 3, maxLength: 100 })}
            />
            {errors.email && errors.email.type === "required" && (
              <ErrorFeedBack text="Email is required." />
            )}
            {errors.email && errors.email.type === "minLength" && (
              <ErrorFeedBack text="Email must has minimum 3 length." />
            )}
            {errors.email && errors.email.type === "maxLength" && (
              <ErrorFeedBack text="Email must has maximum 100 length." />
            )}
          </div>
          <div className="col-12">
            <textarea
              name="text"
              id="message"
              placeholder="Message"
              rows="4"
              ref={register({ required: true, minLength: 3, maxLength: 200 })}
            ></textarea>
            {errors.text && errors.text.type === "required" && (
              <ErrorFeedBack text="Message is required." />
            )}
            {errors.text && errors.text.type === "minLength" && (
              <ErrorFeedBack text="Message must has minimum 3 length." />
            )}
            {errors.text && errors.text.type === "maxLength" && (
              <ErrorFeedBack text="Message must has maximum 200 length." />
            )}
          </div>
        </div>
        <ul style={buttonStyle} className="actions">
          <li>
            <input
              type="submit"
              disabled={
                form.isLoading ||
                form.result === "success" ||
                form.result === "fail"
              }
              value="Send Message"
            />
          </li>
        </ul>
      </form>
    </Fragment>
  )
}

export default Form
