import React, { FC } from 'react'
import { View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

import { IconProps } from './Icon.shared'
import styles from './Icon.styles'
import icons from '@/icons/native'

export interface NativeIconProps extends IconProps {
  /** Callback on click */
  onPress?: (e) => void
}

const Icon: FC<NativeIconProps> = ({ icon, onPress, ...style }) => {
  const Container: FC<any> = onPress ? StyledButton : StyledContainer
  const as = onPress ? TouchableOpacity : View
  const Component = icons[icon]

  return (
    <Container as={as} onPress={onPress} {...style}>
      <StyledWrapper {...style}>
        <Component />
      </StyledWrapper>
    </Container>
  )
}

export default Icon

const StyledContainer = styled.View<NativeIconProps>`
  ${styles.commons.container}
  ${props => styles.commons.background.container(props.background)}
`

const StyledButton = styled(StyledContainer)`
  ${props => (props.disabled ? styles.disabled : '')}
`

const StyledWrapper = styled.View<any>`
  ${styles.commons.wrapper}
  ${props => (props.background ? styles.commons.background.wrapper : null)}
`
