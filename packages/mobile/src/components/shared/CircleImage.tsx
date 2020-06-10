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
  const Inner = circle ? BackgroundWrapper : Icon

  return (
    <Component style={style}>
      <Inner onPress={onPress} background={background} size="100%" padding={0}>
        <Image {...rest} />
      </Inner>
    </Component>
  )
}

CircleImage.defaultProps = {
  circle: false
}

const Component = styled(Container)<WrapperProps>`
  width: 60px;
  height: 60px;
  border-radius: ${60 / 2}px;
  box-shadow: 0px 6px 3px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`

const BackgroundWrapper = styled(Component)<WrapperProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ background }) => Colors[background]};
`

const Image = styled.ImageBackground`
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;
`

export default CircleImage
