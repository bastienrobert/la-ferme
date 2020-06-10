import React from 'react'
import styled from 'styled-components/native'

import { TypoFC, presets } from './Typo.shared'
import generateTypoStyle from './Typo.styles'

const Typo: TypoFC = ({ children, ...style }) => {
  return (
    <StyledTypo isReactNative {...style}>
      {children}
    </StyledTypo>
  )
}

Typo.presets = presets

export default Typo

const StyledTypo: any = styled.Text`
  ${generateTypoStyle}
`
