import React from 'react'
import styled from 'styled-components/native'

import { ITypoProps } from './'
import generateTypoStyle from './Typo.styled'

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
