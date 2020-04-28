import React, { FC } from 'react'
import styled from 'styled-components/native'

import Background from './Background.native'
import {
  ButtonProps,
  variants,
  defaultSize,
  defaultVariant
} from './Button.shared'
import styles from './Button.styles'

export interface NativeButtonProps extends ButtonProps {
  /** Callback on press */
  onPress: (e) => void
}

const Button: FC<NativeButtonProps> = ({
  children,
  variant,
  onPress,
  disabled,
  ...style
}) => {
  const Container = disabled ? DisabledButtonContainer : ButtonContainer

  return (
    <Container onPress={disabled ? undefined : onPress} {...style}>
      <Background color={variants[variant]} />
      <ButtonText {...style}>{children}</ButtonText>
    </Container>
  )
}

const ButtonContainer = styled.TouchableOpacity<any>`
  ${styles.box()}
`

/**
 * TODO
 *
 * DisabledButtonContainer should extends ButtonContainer
 * but take View in `as` attrs
 *
 * https://spectrum.chat/styled-components/general/cant-use-as-property-on-react-native~3fd4b59c-3a45-49ee-8f49-8f0f70c59d82
 */
const DisabledButtonContainer = styled.View<any>`
  ${styles.box()}
  ${styles.commons.disabled}
`

const ButtonText = styled.Text<any>`
  ${styles.native.text}
  ${props => styles.text(props.size)}
`

Button.defaultProps = {
  size: defaultSize,
  variant: defaultVariant
}

export default Button
