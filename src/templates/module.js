import React, {Fragment} from 'react'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql, Link } from 'gatsby'

const shortcodes = { Link }

export default ({ data: {module} }) => (
  console.log(module.parent.body) ||
  <Fragment>
    <h1>{module.frontmatter.title}</h1>
    <MDXProvider components={shortcodes}>
      <MDXRenderer>{module.parent.body}</MDXRenderer>
    </MDXProvider>
  </Fragment>
)

export const pageQuery = graphql`
  query($path: String!) {
    module: academyModule(slug: { eq: $path }) {
      frontmatter {
        title
      }
      parent {
        ... on Mdx {
          body
        }
      }
    }
  }
`
