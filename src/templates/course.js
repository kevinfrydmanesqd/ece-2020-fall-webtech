import React, {Fragment, useEffect} from 'react'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql, Link, navigate } from 'gatsby'
// Local
import Container from '../components/Container'
const shortcodes = { Link }


const styles = {
  title: {
    backgroundColor: '#506A4A',
    padding: '2rem 0 1rem 0',
    color: '#fff',
    marginBottom: '2rem',
    '& h1': {
      color: '#fff',
    },
    // '& h1': {
    //   color: '#fff',
    // },
  },
}

export default ({ data: {course} }) => {
  useEffect( () => {
    const onKeyUp = ({key}) => {
      switch(key){
        case 'ArrowLeft':
          navigate('/')
          break
        case 'ArrowRight':
          navigate(course.modules[0].frontmatter.slug)
          break
        default:
          // nothing
      }
    }
    document.addEventListener('keyup', onKeyUp)
    return () => {
      document.removeEventListener('keyup', onKeyUp)
    }
  })
  return (
    <main>
      <Container rootStyles={styles.title}>
        <h1>{course.frontmatter.title}</h1>
        <dl>
          <dt>Teachers</dt>
          <dd>{course.frontmatter.authors.join(', ')}</dd>
          <dt>Course</dt>
          <dd>{course.frontmatter.school} - {course.frontmatter.period}</dd>
        </dl>
      </Container>
      <Container>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{course.parent.body}</MDXRenderer>
        </MDXProvider>
        <div>Modules</div>
        <ul>
          {course.modules.map( (module, i) =>
            <li><Link to={module.frontmatter.slug}>Module {i} - {module.frontmatter.title || module.frontmatter.slug}</Link></li>
          )}
        </ul>
      </Container>
    </main>
)}

export const pageQuery = graphql`
  query($path: String!) {
    course: academyCourse(frontmatter: {slug: {eq: $path}}) {
      frontmatter {
        authors
        title
        period
        school
      }
      modules {
        frontmatter {
          title
          slug
        }
      }
      parent {
        ... on Mdx {
          body
        }
      }
    }
  }
`
