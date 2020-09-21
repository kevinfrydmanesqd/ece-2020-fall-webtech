import React, {Fragment, useEffect, useState} from 'react'
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql, Link, navigate } from 'gatsby'
import { DEFAULT_WIDTH } from 'typography-breakpoint-constants'
// Local
import Svg from '../components/Svg'
import spritesSlide from '../../assets/sprites/slide.svg'
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
  nav: {
    position: 'absolute',
    width: '20%',
    top: '50%',
    transform: 'translateY(-50%)',
    opacity: 0,
    '& a': {
      opacity: .4,
      '&:hover': {
        opacity: .2,
      },
    },
  },
  navVisible: {
    opacity: 1,
  },
  previous: {
    left: 0,
  },
  next: {
    right: 0,
    // marginRight: '-5rem',
  },
}

export default ({ data: {slide} }) => {
  const previous = slide.previous && slide.previous.frontmatter.slug || slide.module.frontmatter.slug
  const next = slide.next && slide.next.frontmatter.slug || slide.module.frontmatter.slug
  const [visible, setVisible] = useState(false)
  let timeout = setTimeout( () => {
    setVisible(false)
  }, 3000)
  useEffect( () => {
    const onKeyUp = ({key}) => {
      switch(key){
        case 'ArrowLeft':
          navigate(previous)
          break
        case 'ArrowRight':
          navigate(next)
          break
        default:
          // nothing
      }
    }
    const onMouseMove = () => {
      console.log('move')
      clearTimeout(timeout)
      setVisible(true)
      setTimeout( () => {
        setVisible(false)
      }, 3000)
    }
    document.addEventListener('keyup', onKeyUp)
    console.log('mousemove')
    document.addEventListener('mousemove', onMouseMove)
    return () => {
      document.removeEventListener('keyup', onKeyUp)
      document.removeEventListener('mousemove', onMouseMove)
    }
  })
  return (
    <main css={styles.container}>
      <div css={styles.slide}>
        <h1>{slide.frontmatter.title}</h1>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{slide.parent.body}</MDXRenderer>
        </MDXProvider>
      </div>
      <div css={[styles.nav, styles.previous, visible && styles.navVisible]}>
        <Link to={previous}>
          <Svg title="previous" href={`${spritesSlide}#previous`} />
        </Link>
      </div>
      <div css={[styles.nav, styles.next, visible && styles.navVisible]}>
        <Link to={next}>
          <Svg title="previous" href={`${spritesSlide}#next`} />
        </Link>
      </div>
    </main>
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
