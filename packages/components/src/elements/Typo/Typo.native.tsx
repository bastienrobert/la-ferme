import React, { FC } from 'react'
import styled from 'styled-components/native'

import { TypoSharedProps, StaticProps, presets } from './Typo.shared'
import generateTypoStyle from './Typo.styles'

export type TypoProps = TypoSharedProps

export type TypoFC = FC<TypoProps> & StaticProps

const Typo: TypoFC = ({ children, ...style }) => {
  return (
    <StyledTypo isReactNative {...style}>
      {children}
    </StyledTypo>
  )
}

Typo.presets = presets

export { Typo }

const StyledTypo: any = styled.Text`
  ${generateTypoStyle}
`
