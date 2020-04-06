import { css } from 'styled-components'

import { Fonts, Colors } from '@/theme'

export default ({ size, color, family, style, isReactNative }) => css`
  font-size: ${size ? Fonts.sizes[size] : Fonts.defaultSize}px;
  color: ${color ? Colors[color] : Fonts.defaultColor};
  ${Fonts.getFontStyle(family, style, isReactNative)}}
`
