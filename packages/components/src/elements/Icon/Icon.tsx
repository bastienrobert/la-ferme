import React, { FC } from 'react'
import styled, { StyledComponentBase } from 'styled-components'

import Background from './Background'
import { IconProps } from './Icon.shared'
import styles from './Icon.styles'
import icons from '@/icons/web'

export interface WebIconProps extends IconProps {
  /** Callback on click */
  onClick?: (e) => void
}

const Icon: FC<WebIconProps> = ({
  icon,
  onClick,
  color,
  background,
  ...style
}) => {
  const Container: StyledComponentBase<'div' | 'button', WebIconProps> = onClick
    ? StyledButton
    : StyledContainer
  const Component = icons[icon]

  return (
    <Container onClick={onClick} {...style}>
      {background && <Background color={background} />}
      <StyledWrapper background={background}>
        <Component color={color} />
      </StyledWrapper>
    </Container>
  )
}

export default Icon

const StyledContainer = styled.div<WebIconProps>`
  ${styles.commons.container}
  ${styles.web}
`

const StyledButton = styled(StyledContainer).attrs({
  as: 'button'
})`
  ${props => (props.disabled ? styles.disabled : '')}
`

const StyledWrapper = styled.div<any>`
  ${({ background }) => (background ? styles.commons.backgroundWrapper : '')}
  ${styles.commons.wrapper}
`
