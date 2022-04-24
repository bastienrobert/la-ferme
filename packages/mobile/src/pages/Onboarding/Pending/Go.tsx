import React, { FC } from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import FastImage from 'react-native-fast-image'
import { Colors } from '@la-ferme/components/native'

import FullContainer from '@/components/shared/FullContainer'

const Go: FC = () => {
  return (
    <Component>
      <Background
        source={require('@/assets/images/pending/go.webp')}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Animation source={require('@/assets/lottie/go.json')} autoPlay />
    </Component>
  )
}

const Component = styled(FullContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${Colors.gray};
  z-index: 2;
`

const Background = styled(FastImage)`
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  bottom: -50px;
`

const Animation = styled(LottieView)`
  width: 100%;
  flex: 1;
  max-width: 400px;
  align-self: center;
`

export default Go
