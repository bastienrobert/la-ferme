import React, { Children } from 'react'

import { ITypoProps } from './'
import StyledTypo from './Typo.styled'

export default function Typo({ children, ...styles }: ITypoProps): JSX.Element {
  return <StyledTypo {...styles}>{Children.only(children)}</StyledTypo>
}
