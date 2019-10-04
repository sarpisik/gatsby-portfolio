import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import Transition from "../components/transition"
import SEO from "../components/seo"
import "../components/layout.css"

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site: sanitySiteSettings {
          title
          description
          keywords
        }
      }
    `}
    render={({ site }) => {
      if (!site) {
        throw new Error(
          'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data'
        )
      }
      return (
        <Fragment>
          <SEO
            title={site.title}
            description={site.description}
            keywords={site.keywords}
          />
          <div
            style={{
              margin: `0 auto`,
              padding: 0,
            }}
          >
            <Transition location={location}>{children}</Transition>
          </div>
        </Fragment>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
