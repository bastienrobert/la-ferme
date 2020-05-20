import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

import { AlignSelfProperty } from 'csstype'

export interface ContainerProps {
  /** Any react object */
  children: any
  /** How you want to align your items */
  alignSelf?: AlignSelfProperty
  /** Custom inline style */
  style?: ViewStyle
}

const Container: FC<ContainerProps> = ({ children, ...style }) => {
  return <StyledView {...style}>{children}</StyledView>
}

const StyledView = styled.View<ContainerProps>`
  align-self: ${props => props.alignSelf};
`

Container.defaultProps = {
  alignSelf: 'flex-start'
}

export default Container
