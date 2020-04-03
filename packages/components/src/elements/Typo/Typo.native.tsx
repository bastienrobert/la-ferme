import React from 'react'
import { Text } from 'react-native'

import { ITypoProps } from './'
import StyledTypo from './Typo.styled'

export default function Typo({ children, ...styles }: ITypoProps): JSX.Element {
  return (
    <StyledTypo isReactNative {...styles}>
      <Text>{children}</Text>
    </StyledTypo>
  )
}
