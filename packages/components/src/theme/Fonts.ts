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

export interface FontFamily {
  regular: FontStyle
  italic?: FontStyle
  medium?: FontStyle
}

export interface FontFamilies {
  sans: FontFamily
  mono: FontFamily
}

const sansFont = "'Helvetica Neue'"
const sansFallback = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const monoFont = 'monospace'
const monoFallback = "'Lucida Console', 'Courier New', monospace"

export const fontFamilies: FontFamilies = {
  sans: {
    regular: `${sansFont}, ${sansFallback}`,
    italic: {
      fontFamily: `${sansFont}, ${sansFallback}`,
      fontStyle: 'italic'
    },
    medium: {
      fontFamily: `${sansFont}, ${sansFallback}`,
      fontWeight: 500
    }
  },
  mono: {
    regular: `${monoFont}, ${monoFallback}`
  }
}
export const defaultFontFamily = 'sans'
export const defaultFontStyle = 'regular'

/**
 * SIZES DEFINITIONS
 */
export const defaultSize = '16'
export const sizes = {
  h1: 34,
  h2: 28,
  h3: 24,
  h4: 21,
  h5: 17,
  h6: 15,
  default: defaultSize
}
export const sizesOptions = [...Object.keys(sizes)] as const
export type Sizes = typeof sizesOptions[number]

/**
 * COLORS DEFINITIONS
 */
export const defaultColor = Colors.black
export const colorsOptions = [...Object.keys(Colors), defaultColor] as const
export type Colors = typeof colorsOptions[number]

/**
 * HELPERS
 */
const splitFontDefinition = (definition, isReactNative) => {
  if (typeof definition === 'string') {
    if (isReactNative) {
      definition = definition.split(',', 1)[0]
    }
    definition = `font-family: ${definition};`
  } else {
    if (isReactNative) {
      definition.fontFamily = definition.fontFamily.split(',', 1)[0]
    }
  }
  return definition
}

export const getFontStyle = (name, style, isReactNative): string => {
  const family = fontFamilies[name] || fontFamilies[defaultFontFamily] // prettier-ignore
  const definition = family[style] || family[defaultFontStyle] // prettier-ignore

  return splitFontDefinition(definition, isReactNative)
}
