import { Colors } from './'

/**
 * FONTS DEFINITIONS
 */
export interface FontDefinition {
  fontFamily: string
  fontWeight?: string | number
  fontStyle?: string
}

export type FontStyle = string | FontDefinition

export interface FontStyles {
  regular: FontStyle
  italic?: FontStyle
  medium?: FontStyle
}
export type FontStyleOption = keyof FontStyles

export const fontList = ['futura', 'bowlby', 'kobe'] as const
export type FontOption = typeof fontList[number]
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
export const defaultFontFamily = 'futura'
export const defaultFontVariant = 'regular'

/**
 * SIZES DEFINITIONS
 */
export const sizeList = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'default'] as const
export type SizeOption = typeof sizeList[number]
export type Sizes = {
  [key in SizeOption]: number
}
export const defaultSize = 18
export const sizes: Sizes = {
  h1: 34,
  h2: 28,
  h3: 24,
  h4: 21,
  h5: 17,
  h6: 15,
  default: defaultSize
}

/**
 * COLORS DEFINITIONS
 */
export const defaultColor: Colors.Typo = 'black'

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

export const getFontSize = (size): string => {
  return `font-size: ${size ? sizes[size] : defaultSize}px;`
}
