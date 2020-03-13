import React from 'react'
import styled from 'styled-components/native'

import { IButtonProps, defaultSize, defaultVariant } from './index.native'
import styles from './Button.styles'

export interface IOSButtonProps extends IButtonProps {
  /** Callback on click */
  onPress: (e) => void
}

function Button({ children, onPress, ...style }: IOSButtonProps) {
  return (
    <ButtonContainer onPress={onPress} {...style}>
      <ButtonText {...style}>{children}</ButtonText>
    </ButtonContainer>
  )
}

const ButtonContainer = styled.TouchableOpacity<any>`
  ${props => styles.box(props.variant, props.size)}
`

const ButtonText = styled.Text<any>`
  ${props => styles.text(props.variant, props.size)}
`

Button.defaultProps = {
  size: defaultSize,
  variant: defaultVariant
}

export default Button
