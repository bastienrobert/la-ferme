import React, { FC } from 'react'
import styled, { StyledComponentBase } from 'styled-components'

import Background from './Background'
import { IconSharedProps } from './Icon.shared'
import styles from './Icon.styles'
import icons from '@/icons/web'

export interface IconProps extends IconSharedProps {
  /** Callback on click */
  onClick?: (e) => void
}

const Icon: FC<IconProps> = ({
  children,
  icon,
  onClick,
  color,
  background,
  ...style
}) => {
  const Container: StyledComponentBase<'div' | 'button', IconProps> = onClick
    ? StyledButton
    : StyledContainer
  const Component = icons[icon]

  return (
    <Container onClick={onClick} {...style}>
      {background && <Background color={background} />}
      <StyledWrapper background={background}>
        {Component && <Component color={color} />}
        {children}
      </StyledWrapper>
    </Container>
  )
}

export { Icon }

const StyledContainer = styled.div<IconProps>`
  ${styles.commons.container}
  ${styles.web}
`

const StyledButton = styled(StyledContainer).attrs({
  as: 'button'
})`
  ${props => (props.disabled ? styles.disabled : '')}
`

const StyledWrapper = styled.div<IconProps>`
  ${({ background }) => (background ? styles.commons.backgroundWrapper : '')}
  ${styles.commons.wrapper}
`
