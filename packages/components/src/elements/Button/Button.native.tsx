import React, { FC } from 'react'
import { GestureResponderEvent } from 'react-native'
import styled from 'styled-components/native'

import Background from './Background.native'
import {
  ButtonSharedProps,
  variants,
  defaultSize,
  defaultVariant
} from './Button.shared'
import styles from './Button.styles'

export interface ButtonProps extends ButtonSharedProps {
  /** Callback on press */
  onPress: (e?: GestureResponderEvent) => void
}

const Button: FC<ButtonProps> = ({
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

const ButtonContainer = styled.TouchableOpacity`
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

export { Button }
