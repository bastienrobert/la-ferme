import React, { FC } from 'react'
import styled from 'styled-components/native'

import { ContainerProps } from './Container'

export interface FullContainerProps extends ContainerProps {}

const FullContainer: FC<FullContainerProps> = ({ children, ...style }) => {
  return <StyledView {...style}>{children}</StyledView>
}

const StyledView = styled.View`
  flex: 1;
`

export default FullContainer
