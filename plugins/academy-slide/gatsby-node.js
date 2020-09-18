
const crypto = require("crypto")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type AcademySlide implements Node @infer {
      slug: String
    }
  `)
}

exports.onCreateNode = ({ actions, createNodeId, node }) => {
  const { createNode } = actions
  if (node.internal.type !== `Mdx`) { return }
  if(!/content\/courses\/.*\/slides\/.*.md/.test(node.fileAbsolutePath)){ return }
  console.log('!!!', node.fileAbsolutePath)
  // Import properties
  const copy = {}
  const filter = ['children', 'id', 'internal', 'fields', 'parent', 'type']
  Object.keys(node).map( key => {
    if(!filter.some(k => k === key)) copy[key] = node[key]
  })
  createNode({
    // Custom fields
    ...node,
    yoou: 'true',
    slug: copy.frontmatter.slug,
    toto: {
      lulu: 'yes'
    },
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
