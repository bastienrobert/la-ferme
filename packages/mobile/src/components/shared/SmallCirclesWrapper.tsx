import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Svg, Circle } from 'react-native-svg'
import { Colors } from '@la-ferme/components/native'

import Container, { ContainerProps } from './Container'

export type SmallCirclesWrapperProps = ContainerProps

const INNER_WRAPPER_PERC = (28.7757 / 74) * 100

const SmallCirclesIcon: FC<SmallCirclesWrapperProps> = ({ children }) => {
  return (
    <Component>
      <StyledSvg viewBox="0 0 74 74" fill="none">
        <Circle
          cx="36.9998"
          cy="37.346"
          r="28.7757"
          stroke={Colors.beige}
          strokeOpacity="0.6"
          strokeWidth="4"
        />
        <Circle
          opacity="0.6"
          cx="36.9998"
          cy="37.346"
          r="32.7336"
          stroke={Colors.beige}
          strokeOpacity="0.4"
          strokeWidth="3"
        />
        <Circle
          opacity="0.1"
          cx="37"
          cy="37"
          r="36"
          stroke={Colors.beige}
          strokeWidth="2"
        />
      </StyledSvg>
      <StyledContainer alignSelf="center">{children}</StyledContainer>
    </Component>
  )
}

const Component = styled(Container)`
  width: 74px;
  height: 74px;
  align-items: center;
  justify-content: center;
`

const StyledSvg = styled(Svg)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const StyledContainer = styled(Container)`
  width: ${INNER_WRAPPER_PERC}%;
  height: ${INNER_WRAPPER_PERC}%;
  justify-content: center;
  transform: scale(1.15);
  overflow: hidden;
`

export default SmallCirclesIcon
