import React, { Children, cloneElement } from 'react'
import styled from 'styled-components'

import { ITypoProps } from './'
import generateTypoStyle from './Typo.styled'

export default function Typo({ children, ...styles }: ITypoProps): JSX.Element {
  return <StyledTypo {...styles}>{Children.only(children)}</StyledTypo>
}

const StyledTypo = styled(({ children, ...props }) =>
  cloneElement(children, props)
)`
  ${generateTypoStyle}
`
