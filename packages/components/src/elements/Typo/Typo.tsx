import React, { FC, Children, cloneElement } from 'react'
import styled from 'styled-components'

import { TypoSharedProps, StaticProps, presets } from './Typo.shared'
import generateTypoStyle from './Typo.styles'

export interface TypoProps extends TypoSharedProps {
  children: JSX.Element
}

export type TypoFC = FC<TypoProps> & StaticProps

const Typo: TypoFC = ({ children, ...style }) => {
  return <StyledTypo {...style}>{Children.only(children)}</StyledTypo>
}

Typo.presets = presets

export { Typo }

const StyledTypo = styled(({ children, ...props }) =>
  cloneElement(children, props)
)`
  ${generateTypoStyle}
`
