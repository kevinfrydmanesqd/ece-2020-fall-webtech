
const crypto = require("crypto")
const path = require("path")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type AcademySlide implements Node @infer {
      frontmatter: AcademySlideFrontmatter
    }
    type AcademySlideFrontmatter {
      disabled: Boolean
      slug: String!
      slideNumber: Int
      lastSlide: Int
    }
  `)
}

exports.onCreateNode = ({ actions, createNodeId, node }) => {
  const { createNode } = actions
  if (node.internal.type !== `Mdx`) { return }
  if(!/courses\/[a-zA-Z0-9_\-\.]+\/modules\/[a-zA-Z0-9_\-\.]+\/slides\/.*.md/.test(node.fileAbsolutePath)){ return }
  // Import properties
  const copy = {}
  const filter = ['children', 'id', 'internal', 'fields', 'parent', 'type']
  Object.keys(node).map( key => {
    if(!filter.some(k => k === key)) copy[key] = node[key]
  })
  createNode({
    // Custom fields
    ...node,
    // Gatsby fields
    id: createNodeId(node.frontmatter.slug),
    parent: node.id,
    children: [],
    internal: {
      type: `AcademySlide`,
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

exports.createResolvers = ({ createResolvers, createNodeId }) => {
  createResolvers({
    AcademySlide: {
      course: {
        type: `AcademyCourse`,
        resolve(source, args, context, info) {
          return context.nodeModel
          .getAllNodes(
            { type: `AcademyCourse` }, 
            { connectionType: "AcademyCourse" }
          )
          .filter( course =>
            source.frontmatter.slug.startsWith(course.frontmatter.slug)
          )[0]
        },
      },
      module: {
        type: `AcademyModule`,
        resolve(source, args, context, info) {
          return context.nodeModel
          .getAllNodes(
            { type: `AcademyModule` }, 
            { connectionType: "AcademyModule" }
          )
          .filter( module =>
            source.frontmatter.slug.startsWith(module.frontmatter.slug)
          )[0]
        },
      },
      previous: {
        type: `AcademySlide`,
        resolve(source, args, context, info) {
          return context.nodeModel
          .getAllNodes(
            { type: `AcademySlide` }, 
            { connectionType: "AcademySlide" }
          )
          .filter( slide =>
            path.dirname(slide.frontmatter.slug) === path.dirname(source.frontmatter.slug)
          )
          .filter( (slide, i, slides) =>
            slides[i+1] && slides[i+1].id === source.id
          )[0]
        },
      },
      next: {
        type: `AcademySlide`,
        resolve(source, args, context, info) {
          return context.nodeModel
          .getAllNodes(
            { type: `AcademySlide` }, 
            { connectionType: "AcademySlide" }
          )
          .filter( slide =>
            path.dirname(slide.frontmatter.slug) === path.dirname(source.frontmatter.slug)
          )
          .filter( (slide, i, slides) =>
            slides[i-1] && slides[i-1].id === source.id
          )[0]
        },
      }
    }
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const template = path.resolve(`src/templates/slide.js`)
  const result = await graphql(`
    {
      slides: allAcademySlide {
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
  const {slides} = result.data
  slides.nodes.forEach( slide => {
    if (slide.frontmatter.disabled) return
    // Page creation
    createPage({
      path: slide.frontmatter.slug,
      component: template,
    })
  })
}
