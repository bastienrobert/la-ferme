import { Fonts, Colors } from '@/theme'

export interface TypoSharedProps {
  /** The size of the text */
  size?: string | number
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

export type StaticProps = { presets: Presets }

const H1: TypoSharedProps = {
  size: 'h1',
  family: 'bowlby',
  textTransform: 'uppercase'
}

const H2: TypoSharedProps = {
  size: 'h2',
  family: 'bowlby',
  textTransform: 'uppercase'
}

const H3: TypoSharedProps = {
  size: 'h3',
  family: 'bowlby',
  textTransform: 'uppercase'
}

const H4: TypoSharedProps = {
  size: 'h4',
  family: 'bowlby',
  textTransform: 'uppercase'
}

const H5: TypoSharedProps = {
  size: 'h5',
  family: 'bowlby',
  textTransform: 'uppercase'
}

const TAG: TypoSharedProps = {
  size: 'h4',
  family: 'kobe',
  textTransform: 'uppercase'
}

export type PresetOptions = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'TAG'
export type Presets = {
  [key in PresetOptions]: TypoSharedProps
}

export const presets: Presets = { H1, H2, H3, H4, H5, TAG }
