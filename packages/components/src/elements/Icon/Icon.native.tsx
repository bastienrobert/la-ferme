import React, { FC } from 'react'
import styled from 'styled-components/native'

import Background from './Background.native'
import { IconProps, defaultPadding, defaultSize } from './Icon.shared'
import styles from './Icon.styles'
import icons from '@/icons/native'

export interface NativeIconProps extends IconProps {
  /** Callback on click */
  onPress?: (e) => void
}

const Icon: FC<NativeIconProps> = ({
  children,
  icon,
  onPress,
  color,
  background,
  padding,
  size,
  ...style
}) => {
  const Container: FC<any> = onPress ? StyledButton : StyledContainer
  const Component = icons[icon]

  return (
    <Container onPress={onPress} {...style}>
      {background && <Background color={background} />}
      <StyledWrapper background={background} margin={padding} size={size}>
        {Component && <Component color={color} />}
        {children}
      </StyledWrapper>
    </Container>
  )
}

Icon.defaultProps = {
  padding: defaultPadding,
  size: defaultSize
}

export default Icon

const StyledContainer = styled.View<NativeIconProps>`
  ${styles.commons.container}
`

const StyledButton = styled.TouchableOpacity<NativeIconProps>`
  ${props => (props.disabled ? styles.disabled : '')}
`

const StyledWrapper = styled.View<any>`
  ${({ background, margin }) => (background ? { margin } : '')}
  ${({ size }) => ({ width: size, height: size })}
  ${styles.commons.wrapper}
`
