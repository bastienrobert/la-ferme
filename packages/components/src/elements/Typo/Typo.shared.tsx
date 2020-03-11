import { Fonts } from '@/theme'

export interface ITypoProps {
  children: any
  /** The size of the text */
  size?: Fonts.Sizes
  /** The color of the text */
  color?: Fonts.Colors
  /** The font family of the text */
  family?: Fonts.FontFamilies
  /** The font family of the text */
  style?: Fonts.FontFamily
}
