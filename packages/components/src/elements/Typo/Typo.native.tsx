import React from 'react'
import styled from 'styled-components/native'

import { ITypoProps } from './Typo.shared'
import generateTypoStyle from './Typo.styles'

export default function Typo({ children, ...styles }: ITypoProps): JSX.Element {
  return (
    <StyledTypo isReactNative {...styles}>
      {children}
    </StyledTypo>
  )
}

const StyledTypo: any = styled.Text`
  ${generateTypoStyle}
`
