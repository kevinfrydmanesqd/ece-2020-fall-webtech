import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'

const styles = {
  footer: {
    height: '30px',
    backgroundColor: 'rgba(255,255,255,.3)',
    flexShrink: 0,
  },
}

export default () => {
  return (
    <footer style={styles.footer}>
      footer
    </footer>
  );
}
