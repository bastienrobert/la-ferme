import React, { FC } from 'react'
import styled from 'styled-components/native'

export interface ContainerProps {
  /** Any react object */
  children: JSX.Element | React.ComponentType<any>
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <StyledView>{children}</StyledView>
}

const StyledView = styled.View`
  align-self: flex-start;
`

export default Container
