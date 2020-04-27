import { css } from 'styled-components'

import { Fonts, Colors } from '@/theme'

export default ({ size, color, family, variant, isReactNative }) => css`
  color: ${color ? Colors[color] : Fonts.defaultColor};
  ${Fonts.getFontSize(size)}
  ${Fonts.getFontStyle(family, variant, isReactNative)}
`
