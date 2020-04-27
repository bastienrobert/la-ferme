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
  ...style
}) => {
  return (
    <ButtonContainer onPress={onPress} {...style}>
      <Background color={variants[variant]} />
      <ButtonText {...style}>{children}</ButtonText>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.TouchableOpacity<any>`
  ${() => styles.box()}
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
