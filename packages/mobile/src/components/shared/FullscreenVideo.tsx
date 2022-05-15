import React, { FC } from 'react'
import styled from 'styled-components/native'
import Video, { VideoProperties } from 'react-native-video'

const FullscreenVideo: FC<VideoProperties> = props => {
  return <Component resizeMode="cover" {...props} />
}

const Component = styled(Video)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

export default FullscreenVideo
