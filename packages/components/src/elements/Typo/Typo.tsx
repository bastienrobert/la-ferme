import React, { Children, cloneElement } from 'react'
import styled, { css } from 'styled-components'

import { ITypoProps } from './'

import { Fonts, Colors } from '@/theme'

export default function Typo({ children, ...styles }: ITypoProps): any {
  return <StyledTypo {...styles}>{Children.only(children)}</StyledTypo>
}

function computeSizeStyle(size) {
  return `font-size: ${size}px;`
}

function computeColorStyle(color) {
  return `color: ${color};`
}

function getFontStyle(name, style) {
  const family = Fonts.fontFamilies[name] || Fonts.fontFamilies[Fonts.defaultFontFamily] // prettier-ignore
  const definition = family[style] || family[Fonts.defaultFontStyle] // prettier-ignore
  return css`
    ${typeof definition === 'string'
      ? `font-family: ${definition};`
      : definition}
  `
}

function getSizeStyle(size: Fonts.Sizes) {
  if (!size) return computeSizeStyle(Fonts.defaultSize)
  return computeSizeStyle(Fonts.sizes[size])
}

function getColorStyle(color: Fonts.Colors) {
  if (!color) return computeColorStyle(Fonts.defaultColor)
  return computeColorStyle(Colors[color])
}

const StyledTypo = styled(({ children, ...props }: ITypoProps) =>
  cloneElement(children, props)
)`
  ${props => getSizeStyle(props.size)}
  ${props => getColorStyle(props.color)}
  ${props => getFontStyle(props.family, props.style)}
`
