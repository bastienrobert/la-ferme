import { UNKNOWN } from '../'
import { Locale } from '../../typings'

import fr from './fr'

export const locales = {
  fr
}

interface TranslateErrorOptions {
  locale: Locale
  fallback?: boolean
}

export default (
  error: string,
  { locale, fallback = true }: TranslateErrorOptions
): string | undefined => {
  const split = error.split('.')

  let res = locales[locale]
  for (let i = 0; i < split.length; i++) {
    res = res[split[i]]
    if (!res) break
  }

  return typeof res === 'string'
    ? res
    : fallback
    ? locales[locale][UNKNOWN]
    : undefined
}
