import React from 'react'
import styled from 'styled-components'

import { IButtonProps, defaultSize, defaultVariant } from './'
import styles from './Button.styles'

export interface WebButtonProps extends IButtonProps {
  /** Callback on click */
  onClick?: (e: Event) => void
}

function Button({ children, ...style }: WebButtonProps) {
  return <StyledButton {...style}>{children}</StyledButton>
}

Button.defaultProps = {
  size: defaultSize,
  variant: defaultVariant
}

export default Button

const StyledButton = styled.button<any>`
  ${props => styles.box(props.variant, props.size, true)}
  ${props => styles.text(props.variant, props.size, true)}
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: not-allowed;
  }
`
