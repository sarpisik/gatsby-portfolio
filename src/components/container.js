import React from "react"
import { Link } from "gatsby"
import CopyRight from "./copyRight"

const frameStyle = {
    height: "100%",
    padding: "1rem 0",
  },
  containerStyle = {
    margin: "1rem auto",
    maxWidth: "600px",
    padding: "1rem",
    // boxShadow: "0px 0px 3px 3px rgba(73,191,157,0.5)",
    backgroundColor: "#fff",
    borderRadius: "0.35em",
  }

const Container = ({ children }) => (
  <div className="background-dark" style={frameStyle}>
    <div style={containerStyle}>
      <Link to="/" className="icon solid fa-long-arrow-alt-left">
        &nbsp; Back
      </Link>
      <hr />
      {children}
      <hr />
      <CopyRight />
    </div>
  </div>
)

export default Container
