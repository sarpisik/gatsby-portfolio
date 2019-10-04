import React, { Fragment } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Container from "../components/container"
import "devicon/devicon.min.css"
import SEO from "../components/seo"

const Skill = ({ icon, name }) => (
  <div className="align-center">
    <i className={`${icon} colored`}></i>
    <p className="font-weight-bold text-dark">{name}</p>
  </div>
)

const Gatsby = () => {
  const data = useStaticQuery(graphql`
    query {
      strapiIcon: file(relativePath: { eq: "strapi-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
      gatsbyIcon: file(relativePath: { eq: "gatsby-icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
            originalName
          }
        }
      }
    }
  `)
  return Object.values(data).map((image, index) => {
    const name = image.childImageSharp.fluid.originalName.split("-")[0],
      capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)

    return (
      <div key={index} className="align-center">
        <Img className="skill-icon" fluid={image.childImageSharp.fluid} />
        <p className="font-weight-bold text-dark">{capitalizedName}</p>
      </div>
    )
  })
}

const Skills = () => (
  <Fragment>
    <SEO
      title="Skills & Tools"
      meta={[
        {
          name: "keywords",
          content:
            "web developer skills, web developer full stack, web developer freelance skills, software skills, fullstack developer skills, frontend developer skills, backend developer skills, javascript, html5, css3, react js, node js, mongo db, gatsby, strapi, express js, mern stack, jamstack",
        },
      ]}
    />
    <Container>
      <h1>Skills</h1>
      <h2>Basics</h2>
      <div className="row">
        <Skill icon="devicon-html5-plain" name="Html 5" />
        <Skill icon="devicon-css3-plain" name="CSS 3" />
        <Skill icon="devicon-javascript-plain" name="ES 6" />
      </div>
      <hr />
      <h2>MERN Stack</h2>
      <div className="row">
        <Skill icon="devicon-mongodb-plain" name="MONGO DB" />
        <Skill icon="devicon-express-original" name="EXPRESS JS" />
        <Skill icon="devicon-react-original" name="REACT JS" />
        <Skill icon="devicon-nodejs-plain" name="NODE JS" />
      </div>
      <hr />
      <h2>JamSTACK</h2>
      <div className="row">
        <Gatsby />
      </div>
      <hr />
      <h1>Tools</h1>
      <div className="row">
        <Skill icon="devicon-webpack-plain" name="WEBPACK" />
        <Skill icon="devicon-git-plain" name="GIT" />
        <Skill icon="devicon-github-plain" name="GITHUB" />
        <Skill icon="devicon-travis-plain" name="TRAVIS" />
        <Skill icon="devicon-mocha-plain" name="Mocha" />
        <Skill icon="devicon-jasmine-plain" name="Jasmine" />
        <Skill icon="devicon-ubuntu-plain" name="Ubuntu" />
        <Skill icon="devicon-visualstudio-plain" name="VS Code" />
      </div>
    </Container>
  </Fragment>
)

export default Skills
