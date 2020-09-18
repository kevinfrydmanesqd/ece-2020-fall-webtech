import React from "react"
import {graphql, Link} from "gatsby"

export default({
  data: {modules}
}) => (
  <div>
    {modules.nodes.map( module =>
      <div>
        <Link to={module.frontmatter.slug}>{module.frontmatter.title}</Link>
      </div>
    )}
  </div>
)

export const query = graphql`
  query {
    modules: allAcademyCourse(
      sort: {order: ASC, fields: frontmatter___title}
    ) {
      nodes {
        frontmatter {
          title
          slug
        }
      }
    }
  }
`
