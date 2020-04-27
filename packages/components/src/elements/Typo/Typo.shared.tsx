import { Fonts, Colors } from '@/theme'

export interface TypoProps {
  children: JSX.Element
  /** The size of the text */
  size?: Fonts.SizeOption
  /** The color of the text */
  color?: Colors.Typo
  /** The font family of the text */
  family?: Fonts.FontOption
  /** The font family variant */
  variant?: Fonts.FontStyleOption
  /** Align the text */
  textAlign?: Fonts.TextAlignOption
}
