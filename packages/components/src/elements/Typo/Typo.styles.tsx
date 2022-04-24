import { css, CSSObject } from 'styled-components'

import { Fonts, Colors } from '@/theme'

export default ({
  size,
  color,
  textAlign,
  textTransform,
  family,
  variant,
  isReactNative
}) => css`
  color: ${color ? Colors[color] : Colors[Fonts.defaultColor]};
  text-align: ${textAlign || 'left'};
  text-transform: ${textTransform || 'none'};
  ${Fonts.getFontSize(size) as CSSObject}
  ${Fonts.getFontStyle(family, variant, isReactNative)}
`
