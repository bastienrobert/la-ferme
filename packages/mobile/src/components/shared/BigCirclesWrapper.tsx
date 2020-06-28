import React, { FC } from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { Colors } from '@la-ferme/components/native'

import Container, { ContainerProps } from '@/components/shared/Container'

export interface BigCirclesWrapperProps extends ContainerProps {
  background?: Colors.Theme
}

const BigCirclesWrapper: FC<BigCirclesWrapperProps> = ({
  children,
  background = 'gray',
  ...props
}) => {
  return (
    <Component {...props}>
      <Animation
        source={require('@/assets/lottie/big_circles.json')}
        autoPlay
      />
      <Wrapper background={background} alignSelf="center">
        {children}
      </Wrapper>
    </Component>
  )
}

const Component = styled(Container)`
  width: 100%;
  justify-content: center;
  max-width: 450px;
  aspect-ratio: 1;
`

const Animation = styled(LottieView)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Wrapper = styled(Container)<any>`
  width: 50%;
  aspect-ratio: 1;
  max-width: 350px;
  border: 4px solid ${Colors.beige};
  border-radius: 1000px;
  overflow: hidden;
  background-color: ${({ background }) => Colors[background]};
`

export default BigCirclesWrapper
