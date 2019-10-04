import React, { Fragment } from "react"
import { graphql } from "gatsby"
import GraphQLErrorList from "../components/graphql-error-list"
import Img from "gatsby-image"
import ReactMarkdown from "react-markdown"
import Container from "../components/container"
import SEO from "../components/seo"

export const query = graphql`
  query ProjectTemplate($id: String!) {
    project: sanityProject(id: { eq: $id }) {
      title
      markdownBody
      mainImage {
        asset {
          fluid(maxWidth: 768) {
            ...GatsbySanityImageFluid
          }
        }
        alt
      }
    }
  }
`

const ProjectTemplate = ({ data, errors }) => (
  <Fragment>
    {errors && <SEO title="GraphQL Error" />}
    {errors && <GraphQLErrorList errors={errors} />}
    {data && data.project && (
      <SEO
        title={data.project.title}
        meta={[
          {
            name: "keywords",
            content: `web developer portfolio project, web developer full stack project, web developer freelance project, portfolio project, fullstack developer project, ${data.project.title}`,
          },
        ]}
      />
    )}
    {data && data.project && (
      <Container>
        <h1>{data.project.title}</h1>
        <Img fluid={data.project.mainImage.asset.fluid} />
        <br />
        <ReactMarkdown
          className="indexArticle"
          source={data.project.markdownBody}
          transformImageUri={uri =>
            uri.startsWith("http") ? uri : `${process.env.IMAGE_BASE_URL}${uri}`
          }
          escapeHtml={false}
        />
      </Container>
    )}
  </Fragment>
)

export default ProjectTemplate
