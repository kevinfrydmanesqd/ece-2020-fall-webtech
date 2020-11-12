import {useState} from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'

const styles = {
  main: {
    backgroundColor: '#373B44',
    overflow: 'hidden',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
  },
}

export default () => {
  const [channel, setChannel] = useState(null)
  const fetchChannel = async (channel) => {
    setChannel(channel)
  }
  return (
    <main css={styles.main}>
      <Channels onChannel={fetchChannel} />
      {channel ? <Channel channel={channel} messages={[]} /> : <Welcome />}
    </main>
  );
}
