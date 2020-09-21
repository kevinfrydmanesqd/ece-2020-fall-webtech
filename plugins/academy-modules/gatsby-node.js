
const crypto = require("crypto")
const path = require("path")
const grayMatter = require("gray-matter")
const {
  createFileNodeFromBuffer,
} = require('gatsby-source-filesystem');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type AcademyModule implements Node @infer {
      frontmatter: AcademyModuleFrontmatter
    }
    type AcademyModuleFrontmatter {
      disabled: Boolean
      slug: String!
      sort: Int
    }
  `)
}

exports.onCreateNode = async (args) => {
  const { actions, createNodeId, node, loadNodeContent, store, cache } = args
  const { createNode } = actions
  if (node.internal.type !== `Mdx`) { return }
  // Filter non-blog files
  if(!/courses\/[a-zA-Z0-9_\-\.]+\/modules\/[a-zA-Z0-9_\-\.]+\/index\.md/.test(node.fileAbsolutePath)){ return }
  node.frontmatter.disabled = !!node.frontmatter.disabled
  if(node.frontmatter.disabled) return
  // Lang
  const filename = path.basename(node.fileAbsolutePath)
  const slugs = path.dirname(node.fileAbsolutePath).split(path.sep)
  const moduleSlug = slugs.pop()
  slugs.pop()
  const courseSlug = slugs.pop()
  const [sort, slug] = moduleSlug.split('.')
  node.frontmatter.slug = `/courses/${courseSlug}/${slug}/`
  node.frontmatter.sort = parseInt(sort)
  // BlogArticle
  const copy = {}
  const filter = ['children', 'id', 'internal', 'fields', 'parent', 'type']
  Object.keys(node).map( key => {
    if(!filter.some(k => k === key)) copy[key] = node[key]
  })
  // Generate slide files
  const createSlideFile = async (fileContent, fileName) => {
    await createFileNodeFromBuffer({
      buffer: Buffer.from(fileContent, 'utf8'),
      store,
      cache,
      createNode,
      createNodeId,
      name: fileName,
      ext: '.mdx',
    });
  }
  const nodeContent = await loadNodeContent(node);
  const { content, data: originalFrontmatter } = grayMatter(nodeContent);
  let inSlide = false
  const slides = content.split(/(^## )/m)
  // Skip everything before first occurence of '##'
  .filter( (el) => {
    if( el === '## ' ){
      inSlide = true
    }
    return inSlide
  })
  // remove empty blocks
  .filter( el => el.trim())
  // remove split characters
  .filter( el => el !== '## ' )
  // Re-integration split characters and merge it all
  .map( (el) => '## '+el)
  for(let i=0; i<slides.length; i++){
    const slide = slides[i]
    .split(/(^#)/m)
    .filter( el => el !== '#')
    .join('')
    const slideNumber = i
    const slideFrontmatter = {
      ...originalFrontmatter,
      slideNumber,
      lastSlide: slides.length,
      slug: `/courses/${courseSlug}/${slug}/slides/${slideNumber}/`,
    };
    const slideContent = grayMatter.stringify(slide, slideFrontmatter);
    await createSlideFile(slideContent, path.dirname(node.fileAbsolutePath)+'/slides/'+slideNumber);
  }
  createNode({
    // Custom fields
    ...copy,
    // Gatsby fields
    id: createNodeId(node.frontmatter.slug),
    parent: node.id,
    children: [],
    internal: {
      type: `AcademyModule`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(node))
        .digest(`hex`)
    }
  })
}

exports.createResolvers = ({ createResolvers, createNodeId }) => {
  createResolvers({
    AcademyModule: {
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
      slides: {
        type: [`AcademySlide`],
        resolve(source, args, context, info) {
          return context.nodeModel
          .getAllNodes(
            { type: `AcademySlide` }, 
            { connectionType: "AcademySlide" }
          )
          .filter(slide =>
            slide.frontmatter.slug.startsWith(source.frontmatter.slug)
          )
        },
      },
    }
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const template = path.resolve(`src/templates/module.js`)
  const result = await graphql(`
    {
      modules: allAcademyModule {
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
  const {modules} = result.data
  modules.nodes.forEach( module => {
    if (module.frontmatter.disabled) return
    // Page creation
    createPage({
      path: module.frontmatter.slug,
      component: template,
    })
  })
}
