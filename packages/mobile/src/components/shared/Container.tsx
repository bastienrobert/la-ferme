import React, { FC, forwardRef, Ref } from 'react'
import { View, ViewProps } from 'react-native'
import styled from 'styled-components/native'

import { AlignSelfProperty } from 'csstype'

export interface ContainerProps extends ViewProps {
  /** Any react object */
  children?: any
  /** How you want to align your items */
  alignSelf?: AlignSelfProperty
  /** Forwarded ref */
  innerRef?: Ref<View>
}

const Container: FC<ContainerProps> = ({ children, innerRef, ...style }) => {
  return (
    <Component ref={innerRef} {...style}>
      {children}
    </Component>
  )
}

const Component = styled.View<ContainerProps>`
  align-self: ${props => props.alignSelf};
`

Container.defaultProps = {
  alignSelf: 'flex-start'
}

export default forwardRef<View, ContainerProps>((props, ref: Ref<View>) => (
  <Container innerRef={ref} {...props} />
))
