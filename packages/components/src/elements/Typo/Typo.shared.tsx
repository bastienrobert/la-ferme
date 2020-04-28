import { Fonts, Colors } from '@/theme'

export interface TypoOptions {
  /** The size of the text */
  size?: Fonts.SizeOption
  /** The color of the text */
  color?: Colors.Typo
  /** The font family of the text */
  family?: Fonts.FontOption
  /** The font family face */
  variant?: Fonts.FontStyleOption
  /** Specifies how to capitalize a text */
  textTransform?: Fonts.TextTransformOption
  /** Align the text */
  textAlign?: Fonts.TextAlignOption
}

export interface TypoProps extends TypoOptions {
  children: JSX.Element
}

const H1: TypoOptions = {
  size: 'h1',
  family: 'bowlby',
  textTransform: 'uppercase'
}

const H2: TypoOptions = {
  size: 'h2',
  family: 'bowlby',
  textTransform: 'uppercase'
}

const H3: TypoOptions = {
  size: 'h3',
  family: 'bowlby',
  textTransform: 'uppercase'
}

const H4: TypoOptions = {
  size: 'h4',
  family: 'bowlby',
  textTransform: 'uppercase'
}

export type PresetOptions = 'H1' | 'H2' | 'H3' | 'H4'
export type Presets = {
  [key in PresetOptions]: TypoOptions
}

export const presets: Presets = { H1, H2, H3, H4 }
