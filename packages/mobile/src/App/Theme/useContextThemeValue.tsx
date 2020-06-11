import { useState, useCallback } from 'react'
import { Colors } from '@la-ferme/components/native'

import { ThemeContext } from './ThemeContext'

export default function useContextThemeValue(): ThemeContext {
  const [theme, setTheme] = useState<Colors.Theme>('gray')

  const setNextTheme = useCallback((nextTheme: Colors.Theme): void => {
    setTheme(nextTheme)
  }, [])

  return {
    theme,
    setTheme: setNextTheme
  }
}
