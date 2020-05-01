import React, { FC } from 'react'
import styled from 'styled-components/native'

import Container, { ContainerProps } from './Container'

export interface FullContainerProps extends ContainerProps {}

const FullContainer: FC<FullContainerProps> = ({
  children,
  alignSelf = 'stretch',
  ...style
}) => {
  return (
    <StyledView alignSelf={alignSelf} {...style}>
      {children}
    </StyledView>
  )
}

const StyledView = styled(Container)`
  flex: 1;
`

export default FullContainer
