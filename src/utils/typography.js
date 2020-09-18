import gray from 'gray-percentage'
import Typography from 'typography'
import {
  // MIN_TABLET_MEDIA_QUERY,
  MOBILE_MEDIA_QUERY,
} from 'typography-breakpoint-constants'

// Notes
// The standard line height is 1.5 (https://every-layout.dev/layouts/stack/)
// The standard spacing between blocks (marginTop) is 1.5rem (https://every-layout.dev/layouts/stack/)

const theme = {
  baseFontSize: '16px',
  linkColor: '#204293',
  linkHoverColor: '#1647E8',
  // baseLineHeight: 1.666,
  bodyColor: 'rgba(0,0,0,0.84)', //#2D3033
  bodyFontFamily: ['Inter', 'sans-serif'],
  // headerColor: 'rgba(255,255,255,0.95)',
  headerColor: 'rgba(0,0,0,1)', //#2D3033
  headerWeight: 'normal',
  headerFontFamily: ['Inter', 'sans-serif'],
  overrideStyles: ({ adjustFontSizeTo, rhythm, scale }, options) => ({
    'body, html': {},
    'main h1,h2,h3,h4,h5,h6': {
      // marginTop: rhythm(1.5),
      // color: '#B3C6C8',
      lineHeight: rhythm(1.5)
    },
    'main h1 a svg, h2 a svg, h3 a svg, h4 a svg, h5 a svg, h6 a svg': {
      // fill: '#B3C6C8',
    },
    'body, html, a': {
      color: options.bodyColor,
      textDecoration: 'none',
    },
    'main a': {
      textDecoration: 'none',
      color: '#19249F',
    },
    'main a:hover, main a:active': {
      color: '#1647E8',
    },
    'main a:hover': {
      textDecoration: 'underline',
    },
    'article h1': {
      textAlign: 'center',
    },
    'article h2': {
      borderBottom: '.5rem solid #fff',
      lineHeight: rhythm(1.5),
    },
    'main h1': {
      marginTop: rhythm(1.5),
      // display: 'inline-block',
    },
    'main p:last-child': {
      marginBottom: 0,
    },
    'main :not(pre) > code[class*="language-"]': {
      padding: '.2em .3em .2em .3em',
      backgroundColor: '#EEEEEE',
      color: '#2D3033',
      wordWrap: 'inherit',
      // backgroundColor: 'rgba(255,255,255,.1)',
      // color: '#fff',
    },
    'main div .gatsby-highlight': {
      marginBottom: '1.45rem',
    },
    'main code[class*="language-"],pre[class*="language-"]': {
      fontFamily: 'Fira Mono !important',
    },
    'main .gatsby-highlight-code-line': {
      display: 'block',
      background: 'rgba(255,255,255,.2)',
    },
    'main .line-numbers': {
      fontFamily: 'Fira Mono !important',
      fontSize: '1em',
    },
    'main .line-numbers-rows': {
      padding: '1rem  0 1rem .6rem',
    },
    // 'main table': {
    //   display: 'block',
    //   // overflowX: 'scroll',
    // },
    'main table thead': {
      backgroundColor: '#F4F4F4',
    },
    'main blockquote': {
      // ...scale(1 / 5),
      color: gray(41),
      paddingLeft: rhythm(13 / 16),
      marginLeft: 0,
      borderLeft: `${rhythm(3 / 16)} solid #fca206`,
    },
    'main blockquote > :last-child': {
      marginBottom: 0,
    },
    'main blockquote cite': {
      // ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontWeight: options.bodyWeight,
    },
    'main blockquote cite:before': {
      content: '"— "',
    },
    // [MIN_TABLET_MEDIA_QUERY]: {
    //   textAlign: 'justify',
    // },
    [MOBILE_MEDIA_QUERY]: {
      'main blockquote': {
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
        paddingLeft: rhythm(9 / 16),
      },
    },
    '.article img': {
      // SVG image are not centered by default
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }),
}

const typography = new Typography(theme)

export default typography
