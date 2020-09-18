import React from 'react'
import PropTypes from 'prop-types';

/*

<svg role="img" preserveAspectRatio="xMinYMin slice" overflow="visible">
  <title>Big Data</title>
  <use xlinkHref={`${categories}#big-data`} />
</svg>
*/
/*

  width: '100%',
  paddingBottom: '100%',
  height: '1px',
  overflow: 'visible',
*/

export default function Component({
  href,
  title,
  className,
  width,
  height,
}) {
  if(!width) width = 50
  if(!height) height = 50
  return (
    <svg
      role="img"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMin slice"
      className={className}
    >
      <title>{title}</title>
      <use xlinkHref={href} />
    </svg>
  )
}

Component.propTypes = {
  title: PropTypes.string
}
