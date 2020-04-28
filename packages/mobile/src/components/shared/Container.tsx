import React, { FC } from 'react'
import styled from 'styled-components/native'

import { AlignSelfProperty } from 'csstype'

export interface ContainerProps {
  /** Any react object */
  children: JSX.Element | JSX.Element[] | React.ComponentType<any>
  /** How you want to align your items */
  alignSelf?: AlignSelfProperty
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
