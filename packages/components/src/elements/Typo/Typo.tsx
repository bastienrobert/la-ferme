import React, { Children, cloneElement } from 'react'
import styled from 'styled-components'

import { TypoFC, presets } from './Typo.shared'
import generateTypoStyle from './Typo.styles'

const Typo: TypoFC = ({ children, ...style }) => {
  return <StyledTypo {...style}>{Children.only(children)}</StyledTypo>
}

Typo.presets = presets

export default Typo

const StyledTypo = styled(({ children, ...props }) =>
  cloneElement(children, props)
)`
  ${generateTypoStyle}
`
