
const crypto = require("crypto")
const path = require("path")
const grayMatter = require("gray-matter")
const {
  createFileNodeFromBuffer,
} = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type AcademyCourse implements Node @infer {
      frontmatter: AcademyCourseFrontmatter
    }
    type AcademyCourseFrontmatter {
      disabled: Boolean
      authors: [String!]!
      title: String
      disabled: Boolean
      slug: String!
    }
  `)
}

exports.onCreateNode = async (args) => {
  const { actions, createNodeId, node, loadNodeContent, store, cache } = args
  const { createNode } = actions
  if (node.internal.type !== `Mdx`) { return }
  // Filter non-blog files
  if(!/courses\/[a-zA-Z0-9_\-\.]+\/index\.md/.test(node.fileAbsolutePath)){ return }
  node.frontmatter.disabled = !!node.frontmatter.disabled
  if(node.frontmatter.disabled) return
  // Lang
  const filename = path.basename(node.fileAbsolutePath)
  const slug = path.dirname(node.fileAbsolutePath).split(path.sep).pop()
  node.frontmatter.slug = `/courses/${slug}/`
  // BlogArticle
  const copy = {}
  const filter = ['children', 'id', 'internal', 'fields', 'parent', 'type']
  Object.keys(node).map( key => {
    if(!filter.some(k => k === key)) copy[key] = node[key]
  })
  createNode({
    // Custom fields
    ...copy,
    // Gatsby fields
    id: createNodeId(node.frontmatter.slug),
    parent: node.id,
    children: [],
    internal: {
      type: `AcademyCourse`,
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
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    AcademyCourse: {
      modules: {
        type: [`AcademyModule`],
        resolve(source, args, context, info) {
          return context.nodeModel
          .getAllNodes(
            { type: `AcademyModule` }, 
            { connectionType: "AcademyModule" }
          )
          .filter(module =>
            module.frontmatter.slug.startsWith(source.frontmatter.slug)
          )
          .sort( (a, b) =>
            a.frontmatter.sort < b.frontmatter.sort ? -1 : 1
          )
        },
      },
    }
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const template = path.resolve(`src/templates/course.js`)
  const result = await graphql(`
    {
      courses: allAcademyCourse {
        nodes {
          frontmatter {
            disabled
            slug
          }
        }
      }
    }
  `)
  if (result.errors) {
    return Promise.reject(result.errors)
  }
  const {courses} = result.data
  courses.nodes.forEach( course => {
    if (course.frontmatter.disabled) return
    // Page creation
    createPage({
      path: course.frontmatter.slug,
      component: template,
    })
  })
}
