import React, { Fragment } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"
import "../styles/main.css"
import Header from "../components/header"
import CopyRight from "../components/copyRight"
import Contact from "../components/contact"
import SEO from "../components/seo"
import { capitalizeLetter } from "../lib/helpers"

export const pageQuery = graphql`
  query IndexQuery {
    freelanceProjects: allSanityProject(
      sort: { order: DESC, fields: publishedAt }
      filter: { categories: { elemMatch: { title: { eq: "freelance" } } } }
    ) {
      edges {
        node {
          id
          title
          markdownBody
          slug {
            current
          }
          mainImage {
            asset {
              fluid(maxWidth: 500) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
        }
      }
    }
    demoProjects: allSanityProject(
      sort: { order: DESC, fields: publishedAt }
      filter: { categories: { elemMatch: { title: { eq: "demo" } } } }
    ) {
      edges {
        node {
          id
          title
          markdownBody
          slug {
            current
          }
          mainImage {
            asset {
              fluid(maxWidth: 500) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
        }
      }
    }
  }
`

const Intro = props => (
  <Fragment>
    <header className="major">
      <h2>Hi,</h2>
    </header>
    {/* <ReactMarkdown {...props} /> */}
    <p>
      <strong>Welcome</strong> to my portfolio website.
    </p>
    <p>
      I am a self-taught <strong>full stack web developer</strong> who lives his
      life in coffee, coding, sports and sleep cycles.
    </p>
    <p>
      I build <strong>websites and web based applications</strong> for
      commercial and non-commercial organizations.
    </p>
    <p>
      Please click below button to if you are interested in the{" "}
      <strong>
        <em>skills</em>
      </strong>{" "}
      I develop and{" "}
      <strong>
        <em>tools</em>
      </strong>{" "}
      I use.
    </p>
    <ul className="actions">
      <li>
        <Link to="/skills" className="button">
          Skills & Tools
        </Link>
      </li>
    </ul>
  </Fragment>
)

const RecentWorks = ({ title, projects }) => (
  <Fragment>
    <h2>{capitalizeLetter(`${title} works`)}</h2>
    <div className="row">
      {projects.map(project => (
        <article
          className="col-6 col-12-xsmall work-item"
          key={project.node.id}
        >
          <Link
            to={`/${project.node.slug.current}`}
            className="image fit thumb"
          >
            <Img
              className="image-overlay"
              imgStyle={{
                backgroundColor: "red",
              }}
              fluid={project.node.mainImage.asset.fluid}
            />
          </Link>
          <h3>{project.node.title}</h3>
        </article>
      ))}
    </div>
  </Fragment>
)

const IndexPage = ({ data }) => (
  <Fragment>
    <SEO
      title="Home"
      meta={[
        {
          name: "keywords",
          content:
            "web developer portfolio, web developer full stack, web developer freelance website, contact form, fullstack developer",
        },
      ]}
    />
    <Header />
    <div id="main">
      <section id="one">
        {/* <Intro source={data.sanityPage.content} /> */}
        <Intro />
      </section>

      <section id="two">
        <RecentWorks
          title="freelance"
          projects={data.freelanceProjects.edges}
        />
      </section>

      <section id="three">
        <RecentWorks title="demo" projects={data.demoProjects.edges} />
      </section>

      <section id="four">
        <Contact />
      </section>

      <CopyRight />
    </div>
  </Fragment>
)

export default IndexPage
