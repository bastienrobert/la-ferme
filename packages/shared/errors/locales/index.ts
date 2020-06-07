import fr from './fr'

export const locales = {
  fr
}

export type Locale = 'fr'

export default (error: string, locale: Locale): string | undefined => {
  const split = error.split('.')

  let res = locales[locale]
  for (let i = 0; i < split.length; i++) {
    res = res[split[i]]
    if (!res) return undefined
  }

  return typeof res === 'string' ? res : undefined
}
