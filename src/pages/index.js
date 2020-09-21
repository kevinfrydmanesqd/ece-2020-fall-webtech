import React from "react"
import {graphql, Link} from "gatsby"
// Local
// import Feature from '../components/Feature'
import Img from 'gatsby-image'

const styles = {
  courses: {
    marginTop: '5rem',
  },
  course: {
    width: '60%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
  },
  feature: {
    width: '300px',
    heigth: '300px',
  },
  info: {
    backgroundColor: '#EBEBEB',
    padding: '1rem',
    flexGrow: 1,
    '& h1': {
      margin: '.8rem 0 1.6rem 0',
      fontSize: '2.6rem',
    },
    '& dl:last-child': {
      marginBottom: 0,
    },
    '& dd:last-child': {
      marginBottom: 0,
    },
  }
}

export default({
  data: {courses}
}) => (
  console.log(courses.nodes[0].frontmatter.feature.childImageSharp.fluid) ||
  <main css={styles.courses}>
    {courses.nodes.map( course =>
      <div css={styles.course} key={course.frontmatter.slug}>
        <div css={styles.feature}>
          {course.frontmatter.feature && (
            <Img fluid={course.frontmatter.feature.childImageSharp.fluid} title={course.frontmatter.title} alt={course.frontmatter.title} />
          )}
        </div>
        <div css={styles.info}>
          <h1>
            <Link to={course.frontmatter.slug}>{course.frontmatter.title}</Link>
          </h1>
          <dl>
            <dt>Teachers</dt>
            <dd>{course.frontmatter.authors.join(', ')}</dd>
            <dt>Course</dt>
            <dd>{course.frontmatter.school} - {course.frontmatter.period}</dd>
          </dl>
        </div>
      </div>
    )}
  </main>
)

export const query = graphql`
  query {
    courses: allAcademyCourse(
      sort: {order: ASC, fields: frontmatter___title}
    ) {
      nodes {
        frontmatter {
          authors
          feature {
            childImageSharp {
              fixed {
                height
                width
                src
              }
              fluid(maxWidth: 980) {
                ...GatsbyImageSharpFluid_withWebp
              }
              resize(width: 1200) {
                src
              }
            }
          }
          period
          school
          slug
          title
        }
      }
    }
  }
`
