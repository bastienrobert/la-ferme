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
    <div>
      <StyledButton {...style}>
        <Background color={variants[variant]} />
        {children}
      </StyledButton>
    </div>
  )
}

Button.defaultProps = {
  size: defaultSize,
  variant: defaultVariant
}

export default Button

const StyledButton = styled.button<any>`
  ${() => styles.box(true)}
  ${props => styles.text(props.size)}
  ${styles.web}
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
`
