import React, { FC } from 'react'
import styled, { StyledComponentBase } from 'styled-components'

import { IconProps } from './Icon.shared'
import styles from './Icon.styles'
import icons from '@/icons/web'

export interface WebIconProps extends IconProps {
  /** Callback on click */
  onClick?: (e) => void
}

const Icon: FC<WebIconProps> = ({ icon, onClick, ...style }) => {
  const Container: StyledComponentBase<'div' | 'button', WebIconProps> = onClick
    ? StyledButton
    : StyledContainer
  const Component = icons[icon]

  return (
    <Container onClick={onClick} {...style}>
      <StyledWrapper {...style}>
        <Component />
      </StyledWrapper>
    </Container>
  )
}

export default Icon

const StyledContainer = styled.div<WebIconProps>`
  ${styles.commons.container}
  ${styles.web}
  ${props => styles.commons.background.container(props.background)}
`

const StyledButton = styled(StyledContainer).attrs({
  as: 'button'
})`
  ${props => (props.disabled ? styles.disabled : '')}
`

const StyledWrapper = styled.div<any>`
  ${styles.commons.wrapper}
  ${props => (props.background ? styles.commons.background.wrapper : null)}
`
