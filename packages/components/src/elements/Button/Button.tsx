import React, { FC } from 'react'
import styled from 'styled-components'

import Background from './Background'
import {
  ButtonProps,
  variants,
  defaultSize,
  defaultVariant
} from './Button.shared'
import styles from './Button.styles'

export interface WebButtonProps extends ButtonProps {
  /** Callback on click */
  onClick?: (e) => void
}

const Button: FC<WebButtonProps> = ({ children, variant, ...style }) => {
  return (
    <StyledButton {...style}>
      <Background color={variants[variant]} />
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  )
}

Button.defaultProps = {
  size: defaultSize,
  variant: defaultVariant
}

export default Button

const StyledButton = styled.button<any>`
  ${({ disabled }) => styles.box(true, disabled)}
  ${props => styles.text(props.size)}
  ${styles.commons.box}
  ${styles.web.box}

  &:disabled {
    ${styles.commons.disabled}
    ${styles.web.disabled}
  }
`

const ButtonText = styled.span`
  position: relative;
  z-index: 1;
`
