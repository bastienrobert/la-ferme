import {
  FontWeightProperty,
  FontStyleProperty,
  FontSizeProperty,
  LineHeightProperty,
  LetterSpacingProperty,
  TextTransformProperty,
  TextAlignProperty
} from 'csstype'

import { Colors } from './'

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

export interface FontStyles {
  regular: FontStyle
  italic?: FontStyle
  medium?: FontStyle
}
export type FontStyleOption = keyof FontStyles

export type FontFamilies = {
  [key in FontOption]: FontStyles
}

const sansFallback = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const futuraFont = 'FuturaLT-Book'
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
  const kobeFamily = generateFontFamily(kobeFont, kobeFallback, isReactNative) // prettier-ignore
  const bowlbyFamily = generateFontFamily(bowlbyFont, bowlbyFallback, isReactNative) // prettier-ignore

  return {
    futura: {
      regular: futuraFamily
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
  textTransform?: TextTransformProperty
}

export type SizeOption = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'default'
export type Sizes = {
  [key in SizeOption]: string | number | SizeDefinition
}
export const defaultSize: string | number | SizeDefinition = 18
export const sizes: Sizes = {
  h1: {
    fontSize: '40px',
    lineHeight: '50px',
    textTransform: 'uppercase'
  },
  h2: '28px',
  h3: '24px',
  h4: '22px',
  h5: '17px',
  h6: '15px',
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

export const getFontSize = (size: string): string => {
  const fs = sizes[size]
  if (!fs) return formatInlineFontSize(defaultSize)

  const isStringOrNumber = typeof fs === 'string' || typeof fs === 'number'
  return isStringOrNumber ? formatInlineFontSize(fs) : fs
}
