const path = require('path')

module.exports = {
  /* Your site config here */
  plugins: [{
    resolve: `academy-courses`
  },{
    resolve: `academy-modules`
  },{
    resolve: `academy-slides`
  },{
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/utils/typography.js`,
      omitGoogleFont: true,
    }
  },{
    resolve: `gatsby-plugin-glamor`,
  },{
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `courses`,
      path: path.join(__dirname, `courses`),
    },
  // },{
  //   resolve: "gatsby-theme-slideshow",
  //   options: {
  //     contentPath: "slides"
  //   }
  // }, {
  //   resolve: "gatsby-plugin-page-creator",
  //   options: {
  //     path: path.join(__dirname, `content`, `modules`),
  //   },
  },{
    resolve: "gatsby-plugin-mdx",
    options: {
      extensions: [`.mdx`, `.md`],
      gatsbyRemarkPlugins: [{
        resolve: `gatsby-remark-prismjs`,
        options: {
          classPrefix: 'language-',
          aliases: {},
          showLineNumbers: false,
          inlineCodeMarker: '±',
          prompt: {
            user: "whoami",
            host: "localhost",
            global: false,
          },
        },
      }],
      gatsbyRemarkPlugins: [ {
        resolve: 'remark-extract-title'
      } ]
    }
  }],
}
