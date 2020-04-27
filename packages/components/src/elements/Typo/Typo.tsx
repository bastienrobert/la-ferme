import React, { FC, Children, cloneElement } from 'react'
import styled from 'styled-components'

import { TypoProps } from './Typo.shared'
import generateTypoStyle from './Typo.styles'

const Typo: FC<TypoProps> = ({ children, ...style }) => {
  return <StyledTypo {...style}>{Children.only(children)}</StyledTypo>
}

export default Typo

const StyledTypo = styled(({ children, ...props }) =>
  cloneElement(children, props)
)`
  ${generateTypoStyle}
`
