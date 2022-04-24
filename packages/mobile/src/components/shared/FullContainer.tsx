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
    <Component alignSelf={alignSelf} {...style}>
      {children}
    </Component>
  )
}

const Component = styled(Container)`
  flex: 1;
`

export default FullContainer
