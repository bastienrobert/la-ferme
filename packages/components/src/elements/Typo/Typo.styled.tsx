import { cloneElement } from 'react'
import styled, { css } from 'styled-components'

import { ITypoProps } from './'
import { Fonts, Colors } from '@/theme'

type TypoStyledProps = ITypoProps & { isReactNative?: boolean }

export default styled(({ children, ...props }: TypoStyledProps) =>
  cloneElement(children, props)
)`
  ${({ size, color, family, style, isReactNative }) => css`
    font-size: ${size ? Fonts.sizes[size] : Fonts.defaultSize}px;
    color: ${color ? Colors[color] : Fonts.defaultColor};
    ${Fonts.getFontStyle(family, style, isReactNative)}}
  `}
`
