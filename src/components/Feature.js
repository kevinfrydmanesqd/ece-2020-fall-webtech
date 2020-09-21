import React from 'react'
import Img from 'gatsby-image'

const styles = {
  feature: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#000',
    '& > div:last-child': {
      // boxSizing: 'content-box',
      position: 'relative',
      margin: '0 auto',
      // padding: '0 2rem',
      maxWidth: '980px',
    },
    // '& img': {
    //   borderLeft: '1px solid rgba(255,255,255,.5)',
    //   borderRight: '1px solid rgba(255,255,255,.5)',
    // },
  },
  // feature_bck: {
  //   position: 'absolute',
  //   left: '-10%',
  //   top: '-10%',
  //   width: '120%',
  //   height: '120%',
  //   backgroundSize: 'cover',
  //   filter: 'blur(20px)',
  //   overflow: 'hidden',
  //   opacity: '.6',
  // },
}

export default function Feature({ bck, large, small, title, children }) {
  const featureBck = true
  return (
    <div css={styles.feature}>
      {featureBck && (
        <div
          css={styles.feature_bck}
          style={
            small && {
              backgroundImage: `url(${small})`,
            }
          }
        />
      )}
      <div>
        <Img fluid={large} title={title} alt={title} />
        {children}
      </div>
    </div>
  )
}
