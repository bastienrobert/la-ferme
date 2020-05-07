import React, { FC } from 'react'
import styled from 'styled-components/native'

import Background from './Background.native'
import { IconProps } from './Icon.shared'
import styles from './Icon.styles'
import icons from '@/icons/native'

export interface NativeIconProps extends IconProps {
  /** Callback on click */
  onPress?: (e) => void
}

const Icon: FC<NativeIconProps> = ({
  icon,
  onPress,
  color,
  background,
  ...style
}) => {
  const Container: FC<any> = onPress ? StyledButton : StyledContainer
  const Component = icons[icon]

  return (
    <Container onPress={onPress} {...style}>
      {background && <Background color={background} />}
      <StyledWrapper background={background}>
        <Component color={color} />
      </StyledWrapper>
    </Container>
  )
}

export default Icon

const StyledContainer = styled.View<NativeIconProps>`
  ${styles.commons.container}
`

const StyledButton = styled.TouchableOpacity<NativeIconProps>`
  ${props => (props.disabled ? styles.disabled : '')}
`

const StyledWrapper = styled.View<any>`
  ${({ background }) => (background ? styles.commons.backgroundWrapper : '')}
  ${styles.commons.wrapper}
`
