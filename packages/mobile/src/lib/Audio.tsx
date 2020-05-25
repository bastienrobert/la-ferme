import React, { FC } from 'react'
import styled from 'styled-components/native'

import Video, { VideoProperties } from 'react-native-video'

const Audio: FC<VideoProperties> = props => {
  return <Component {...props} audioOnly={true} fullscreen={false} />
}

Audio.defaultProps = {
  playInBackground: false,
  ignoreSilentSwitch: 'ignore'
}

const Component = styled(Video)`
  position: absolute;
  width: 0;
  height: 0;
`

export default Audio
