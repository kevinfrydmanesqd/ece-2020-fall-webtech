import React, {Fragment, useEffect} from 'react'
import { graphql, Link, navigate } from 'gatsby'
import { DEFAULT_WIDTH } from 'typography-breakpoint-constants'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
// Local
import Container from '../components/Container'
import Svg from '../components/Svg'
import spritesModule from '../../assets/sprites/module.svg'
const shortcodes = { Link }

const styles = {
  title_root: {
    backgroundColor: '#506A4A',
    padding: '2rem 0 1rem 0',
    color: '#fff',
    marginBottom: '2rem',
    '& h1': {
      color: '#fff',
    }
  },
  title_child: {
    display: 'flex',
    flexDirection: 'row',
    '& :first-child': {
      flexGrow: 1,
    }
  },
  icons: {
    '& a': {
      '& svg': {
        opacity: .6,
        width: '6rem',
        fill: '#fff',
      },
      ':hover': {
        '& svg': {
          opacity: 1,
        },
      },
    },
  }
}

export default ({ data: {module} }) => {
  useEffect( () => {
    const onKeyUp = ({key}) => {
      switch(key){
        case 'ArrowLeft':
          navigate(module.course.frontmatter.slug)
          break
        case 'ArrowRight':
          navigate(module.slides[0].frontmatter.slug)
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
  return(
    <Fragment>
      <Container rootStyles={styles.title_root} childStyles={styles.title_child}>
        <div>
          <h1>{module.course.frontmatter.title} - {module.frontmatter.title}</h1>
          <dl>
            <dt>Duration</dt>
            <dd>{module.frontmatter.duration}</dd>
          </dl>
        </div>
        <div css={styles.icons}>
          <Link to={`${module.slides[0].frontmatter.slug}`}>
            <Svg title="Download" href={`${spritesModule}#slideshow`} />
          </Link>
        </div>
      </Container>
      <Container>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{module.parent.body}</MDXRenderer>
        </MDXProvider>
      </Container>
    </Fragment>
)}

export const pageQuery = graphql`
  query($path: String!) {
    module: academyModule(frontmatter: {slug: {eq: $path}}) {
      frontmatter {
        duration
        slug
        title
      }
      course {
        frontmatter {
          title
          slug
        }
      }
      slides {
        frontmatter {
          slug
          title
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
