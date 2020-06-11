import React, { FC } from 'react'
import styled from 'styled-components/native'

import Background from './Background.native'
import { IconSharedProps, defaultPadding, defaultSize } from './Icon.shared'
import styles from './Icon.styles'
import icons from '@/icons/native'

export interface IconProps extends IconSharedProps {
  /** Callback on click */
  onPress?: (e) => void
}

const Icon: FC<IconProps> = ({
  children,
  icon,
  onPress,
  color,
  background,
  padding,
  size,
  ...style
}) => {
  const Container = onPress ? StyledButton : StyledContainer
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

export { Icon }

const StyledContainer = styled.View<IconProps>`
  ${styles.commons.container}
`

const StyledButton = styled.TouchableOpacity<IconProps>`
  ${props => (props.disabled ? styles.disabled : '')}
`

const StyledWrapper = styled.View<any>`
  ${({ background, margin }) => (background ? { margin } : '')}
  ${({ size }) => ({ width: size, height: size })}
  ${styles.commons.wrapper}
`
