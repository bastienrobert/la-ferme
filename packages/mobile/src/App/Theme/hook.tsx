import { useState, useCallback } from 'react'
import { ThemeContext } from './Context'
import { Colors } from '@la-ferme/components/native'

export default (): ThemeContext => {
  const [theme, setTheme] = useState<Colors.Theme>('gray')

  const setCurrentTheme = useCallback((currentTheme: Colors.Theme): void => {
    setTheme(currentTheme)
  }, [])

  return {
    theme,
    setTheme: setCurrentTheme
  }
}
