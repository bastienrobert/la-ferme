import React, { FC } from 'react'
import { ImageBackgroundProps } from 'react-native'
import styled from 'styled-components/native'

import Container, { ContainerProps } from './Container'
import { Icon, Colors } from '@la-ferme/components/native'

interface WrapperProps extends ContainerProps {
  onPress?: (e: Event) => void
  circle?: boolean
  background?: Colors.IconBackground
}

export type CircleImageProps = ImageBackgroundProps &
  Omit<WrapperProps, 'children'>

const CircleImage: FC<CircleImageProps> = ({
  onPress,
  circle,
  background,
  style,
  ...rest
}) => {
  const Component = circle ? Circle : Icon

  return (
    <Component
      background={background}
      onPress={onPress}
      style={style}
      padding={0}
      size="100%">
      <Image {...rest} />
    </Component>
  )
}

CircleImage.defaultProps = {
  circle: false
}

const Circle = styled(Container)<WrapperProps>`
  width: 60px;
  height: 60px;
  border-radius: ${60 / 2}px;
  background-color: ${({ background }) => Colors[background]};
  overflow: hidden;
`

const Image = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`

export default CircleImage
