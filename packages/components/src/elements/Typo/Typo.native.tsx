import React, { FC } from 'react'
import styled from 'styled-components/native'

import { TypoProps, Presets, presets } from './Typo.shared'
import generateTypoStyle from './Typo.styles'

interface TypoFC extends FC<TypoProps> {
  presets: Presets
}

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
