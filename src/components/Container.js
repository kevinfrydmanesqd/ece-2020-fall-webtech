import React from 'react'

import { DEFAULT_WIDTH } from 'typography-breakpoint-constants'

const styles = {
  container: {
    boxSizing: 'content-box',
    margin: '0 auto',
    padding: '0 2rem 0',
    maxWidth: DEFAULT_WIDTH,
    // '& h1': {
    //   marginTop: '0',
    //   fontWeight: 'normal',
    // },
  },
}

export default ({
  children,
  className,
  rootStyles,
  childStyles,
}) => (
  <div css={rootStyles} className={className}>
    <div css={{ ...styles.container, ...childStyles }}>{children}</div>
  </div>
)
