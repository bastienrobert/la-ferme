import { css } from 'styled-components'

import { Fonts, Colors } from '@/theme'

export default ({
  size,
  color,
  textAlign,
  family,
  variant,
  isReactNative
}) => css`
  color: ${color ? Colors[color] : Colors[Fonts.defaultColor]};
  text-align: ${textAlign || 'left'};
  ${Fonts.getFontSize(size)}
  ${Fonts.getFontStyle(family, variant, isReactNative)}
`
