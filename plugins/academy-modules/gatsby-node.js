
const crypto = require("crypto")
const path = require("path")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type AcademyModule implements Node @infer {
      slug: String!
    }
  `)
}

exports.onCreateNode = ({ node, getNode, actions, createNodeId, reporter }) => {
  const { createNode, createNodeField } = actions
  if (node.internal.type !== `Mdx`) { return }
  // Filter non-blog files
  if(!/content\/courses\/.*\/.*\.md/.test(node.fileAbsolutePath)){ return }
  node.frontmatter.disabled = !!node.frontmatter.disabled
  // Lang
  const filename = path.basename(node.fileAbsolutePath)
  const dir = path.dirname(node.fileAbsolutePath).split(path.sep).pop()
  const [sort, slug] = dir.split('.')
  // BlogArticle
  const copy = {}
  const filter = ['children', 'id', 'internal', 'fields', 'parent', 'type']
  Object.keys(node).map( key => {
    if(!filter.some(k => k === key)) copy[key] = node[key]
  })
  createNode({
    // Custom fields
    ...copy,
    slug: `/courses/${slug}/`,
    sort: parseInt(sort),
    // Gatsby fields
    id: createNodeId(`/courses/${slug}/`),
    parent: node.id,
    children: [],
    internal: {
      type: `AcademyModule`,
      // // An optional field. This is rarely used. It is used when a source plugin sources data it doesn’t know how to transform 
      // content: content,
      // the digest for the content of this node. Helps Gatsby avoid doing extra work on data that hasn’t changed.
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(node))
        .digest(`hex`)
    }
  })
}

// extendNodeType
// setFieldsOnGraphQLNodeType
exports.createResolvers = ({ createResolvers, createNodeId }) => {
  createResolvers({
    AcademyModule: {}
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const template = path.resolve(`src/templates/module.js`)
  const result = await graphql(`
    {
      modules: allAcademyModule {
        nodes {
          slug
          frontmatter {
            disabled
          }
        }
      }
    }
  `)
  if (result.errors) {
    return Promise.reject(result.errors)
  }
  const {modules} = result.data
  modules.nodes.forEach( module => {
    if (module.frontmatter.disabled) return
    console.log('!!!!slug!!!', module.slug)
    // Page creation
    createPage({
      path: module.slug,
      component: template,
    })
  })
  
}
