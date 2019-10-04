import React, { Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Profile = props => (
  <span className="image avatar">
    <Img {...props} />
  </span>
)

const Text = () => (
  <h1>
    <strong>I am Sarp IŞIK</strong>,
    <br />
    Full Stack Web Developer.
  </h1>
)

const ContactIcon = ({ node }) => (
  <li key={node.name}>
    <a
      href={node.url}
      className={`icon ${node.name === "mail" ? "solid" : "brands"} fa-${
        node.name === "mail" ? "envelope" : node.name
      }`}
    >
      <span className="label">{node.name}</span>
    </a>
  </li>
)

const ContactIcons = ({ icons }) => (
  <ul className="icons">{icons.map(ContactIcon)}</ul>
)

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      profilePicture: sanitySiteSettings {
        mainImage {
          asset {
            fixed(width: 100) {
              ...GatsbySanityImageFixed
            }
          }
          alt
        }
      }
      allSanityLink {
        edges {
          node {
            name
            url
          }
        }
      }
    }
  `)

  return (
    <Fragment>
      <header id="header" className="background-dark">
        <div className="inner">
          <Profile
            fixed={data.profilePicture.mainImage.asset.fixed}
            alt="sarp isik avatar"
          />
          <Text />
        </div>
        <footer id="footer" className="social-icons">
          <div className="inner">
            <ContactIcons icons={data.allSanityLink.edges} />
          </div>
        </footer>
      </header>
    </Fragment>
  )
}

export default Header
