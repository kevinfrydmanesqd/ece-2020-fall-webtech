import React, {Fragment, useEffect} from 'react'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql, Link, navigate } from 'gatsby'

import { DEFAULT_WIDTH } from 'typography-breakpoint-constants'
// Local
const shortcodes = { Link }

const styles = {
  container: {
    // maxWidth: DEFAULT_WIDTH,
    // margin: 'auto',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    maxWidth: DEFAULT_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}

export default ({ data: {slide} }) => {
  useEffect( () => {
    const onKeyUp = ({key}) => {
      switch(key){
        case 'ArrowLeft':
          navigate(slide.previous && slide.previous.frontmatter.slug || slide.module.frontmatter.slug)
          break
        case 'ArrowRight':
          navigate(slide.next && slide.next.frontmatter.slug || slide.module.frontmatter.slug)
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
    <div css={styles.container}>
      <div css={styles.slide}>
        <h1>{slide.frontmatter.title}</h1>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{slide.parent.body}</MDXRenderer>
        </MDXProvider>
      </div>
    </div>
)}

export const pageQuery = graphql`
  query($path: String!) {
    slide: academySlide(frontmatter: {slug: {eq: $path}}) {
      frontmatter {
        slug
        title
      }
      previous {
        frontmatter {
          slug
        }
      }
      next {
        frontmatter {
          slug
        }
      }
      module {
        frontmatter {
          slug
        }
      }
      course {
        frontmatter {
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
