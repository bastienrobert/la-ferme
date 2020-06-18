import React, { FC } from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { Colors } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'

const BigCirclesWrapper: FC = ({ children }) => {
  return (
    <Component>
      <Animation
        source={require('@/assets/lottie/big_circles.json')}
        autoPlay
      />
      <Wrapper alignSelf="center">{children}</Wrapper>
    </Component>
  )
}

const Component = styled(Container)`
  width: 80%;
  justify-content: center;
  max-width: 400px;
  aspect-ratio: 1;
  border: 1px solid red;
`

const Animation = styled(LottieView)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid blue;
`

const Wrapper = styled(Container)`
  width: 50%;
  aspect-ratio: 1;
  max-width: 350px;
  border: 4px solid ${Colors.beige};
  border-radius: 1000px;
  background-color: red;
`

export default BigCirclesWrapper
