import React, { FC } from 'react'
import styled from 'styled-components/native'

import { TypoProps } from './Typo.shared'
import generateTypoStyle from './Typo.styles'

const Typo: FC<TypoProps> = ({ children, ...style }) => {
  return (
    <StyledTypo isReactNative {...style}>
      {children}
    </StyledTypo>
  )
}

export default Typo

const StyledTypo: any = styled.Text`
  ${generateTypoStyle}
`
