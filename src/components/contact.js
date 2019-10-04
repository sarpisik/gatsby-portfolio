import React, { Fragment } from "react"
import Form from "./form"

const EmailIcon = () => (
  <ul className="labeled-icons">
    <li>
      <h3 className="icon solid fa-envelope">
        <span className="label">Email</span>
      </h3>
      <a href="mailto:contact@sarpisik.com">contact@sarpisik.com</a>
    </li>
  </ul>
)

const Contact = () => (
  <Fragment>
    <h2>Get In Touch</h2>
    <p>
      Although I'm currently interested in freelance or remote jobs, feel free
      to leave a message for other offers.
    </p>
    <div className="row">
      <div className="col-8 col-12-small">
        <Form />
      </div>
      <div className="col-4 col-12-small">
        <EmailIcon />
      </div>
    </div>
  </Fragment>
)

export default Contact
