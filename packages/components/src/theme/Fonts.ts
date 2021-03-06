import {
  FontWeightProperty,
  FontStyleProperty,
  FontSizeProperty,
  LineHeightProperty,
  LetterSpacingProperty,
  TextAlignProperty,
  TextTransformProperty
} from 'csstype'

import { Colors } from './'

import { K } from '@/utils'

/**
 * FONTS DEFINITIONS
 */
export type FontOption = 'futura' | 'bowlby' | 'kobe'
export interface FontDefinition {
  fontFamily: FontOption
  fontWeight?: FontWeightProperty
  fontStyle?: FontStyleProperty
}

export type FontStyle = string | FontDefinition

export type TextAlignOption = TextAlignProperty
export type TextTransformOption = TextTransformProperty

export interface FontStyles {
  regular: FontStyle
  italic?: FontStyle
  medium?: FontStyle
  bold?: FontStyle
}
export type FontStyleOption = keyof FontStyles

export type FontFamilies = {
  [key in FontOption]: FontStyles
}

const sansFallback = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const futuraFont = 'FuturaLT-Book'
const futuraBoldFont = 'FuturaLT-Bold'
const futuraFallback = sansFallback
const kobeFont = 'THANKYOUKOBE'
const kobeFallback = sansFallback
const bowlbyFont = 'BowlbyOneSC-Regular'
const bowlbyFallback = sansFallback

const generateFontFamily = (font, fallback, isReactNative) => {
  return isReactNative ? font : `${font}, ${fallback}`
}

const generateFontFamilies = (isReactNative): FontFamilies => {
  const futuraFamily = generateFontFamily(futuraFont, futuraFallback, isReactNative) // prettier-ignore
  const futuraBoldFamily = generateFontFamily(futuraBoldFont, futuraFallback, isReactNative) // prettier-ignore
  const kobeFamily = generateFontFamily(kobeFont, kobeFallback, isReactNative) // prettier-ignore
  const bowlbyFamily = generateFontFamily(bowlbyFont, bowlbyFallback, isReactNative) // prettier-ignore

  return {
    futura: {
      regular: futuraFamily,
      bold: futuraBoldFamily
    },
    bowlby: {
      regular: bowlbyFamily
    },
    kobe: {
      regular: kobeFamily
    }
  }
}

export const fontFamilies = generateFontFamilies(false)
export const fontFamiliesRN = generateFontFamilies(true)
export const defaultFontFamily: FontOption = 'futura'
export const defaultFontVariant: FontStyleProperty = 'regular'

/**
 * SIZES DEFINITIONS
 */
export interface SizeDefinition {
  fontSize: FontSizeProperty<string | number>
  lineHeight?: LineHeightProperty<string | number>
  letterSpacing?: LetterSpacingProperty<string | number>
}

export type Sizes = {
  [key in K]: string | number | SizeDefinition
}

const percToPx = (
  fontSize: string | number,
  multiplier: number,
  suffix = 'px'
): string => {
  const fs = typeof fontSize === 'string' ? parseFloat(fontSize) : fontSize
  return fs * multiplier + suffix
}

export const defaultSize: string | number | SizeDefinition = {
  fontSize: '18px',
  lineHeight: percToPx(18, 1.205)
}
export const sizes: Sizes = {
  h1: {
    fontSize: '46px',
    lineHeight: percToPx(46, 1.205),
    letterSpacing: percToPx(46, 0.04)
  },
  h2: {
    fontSize: '40px',
    lineHeight: percToPx(40, 1.205),
    letterSpacing: percToPx(40, 0.04)
  },
  h3: {
    fontSize: '22px',
    lineHeight: percToPx(22, 1.48),
    letterSpacing: percToPx(22, 0.04)
  },
  h4: {
    fontSize: '22px',
    lineHeight: percToPx(22, 1.2)
  },
  h5: {
    fontSize: '16px',
    lineHeight: percToPx(16, 1.3),
    letterSpacing: percToPx(16, 0.04)
  },
  h6: '14px',
  medium: {
    fontSize: '32px',
    lineHeight: percToPx(32, 1.5),
    letterSpacing: percToPx(16, 0.04)
  },
  small: {
    fontSize: '14px',
    lineHeight: percToPx(16, 1.3),
    letterSpacing: percToPx(16, 0.04)
  },
  default: defaultSize
}

/**
 * COLORS DEFINITIONS
 */
export const defaultColor: Colors.Typo = 'gray'

/**
 * HELPERS
 */
export const getFontStyle = (name?, variant?, isReactNative?): string => {
  const ff = isReactNative ? fontFamiliesRN : fontFamilies
  const family = ff[name] || ff[defaultFontFamily]
  const definition = family[variant] || family[defaultFontVariant]

  return typeof definition === 'string'
    ? `font-family: ${definition};`
    : definition
}

const formatInlineFontSize = (size: string | number): string => {
  const suffix = typeof size === 'number' ? 'px' : ''
  return `font-size: ${size}${suffix};`
}

export const getFontSize = (size: string | number): SizeDefinition | string => {
  const fs = size ? sizes[size] : defaultSize
  if (!fs) return formatInlineFontSize(size)

  if (typeof fs === 'string' || typeof fs === 'number') {
    return formatInlineFontSize(fs)
  } else return fs
}
