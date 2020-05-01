import React, { FC } from 'react'
import { View, TouchableOpacity, ImageBackgroundProps } from 'react-native'
import styled from 'styled-components/native'

import Container, { ContainerProps } from './Container'

interface WrapperProps extends ContainerProps {
  onPress?: (e: Event) => void
  color?: string
}

export type CircleImageProps = ImageBackgroundProps &
  Omit<WrapperProps, 'children'>

const CircleImage: FC<CircleImageProps> = ({ onPress, color, ...rest }) => {
  return (
    <Component
      as={onPress ? TouchableOpacity : View}
      color={color}
      onPress={onPress}>
      <Image {...rest} />
    </Component>
  )
}

const Component = styled(Container)<WrapperProps>`
  width: 60px;
  height: 60px;
  border-radius: ${60 / 2}px;
  background-color: red;
  overflow: hidden;
`

const Image = styled.ImageBackground`
  width: 60px;
  height: 60px;
  align-items: flex-end;
  justify-content: flex-end;
`

export default CircleImage
