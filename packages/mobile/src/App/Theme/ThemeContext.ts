import { createContext } from 'react'
import { Colors } from '@la-ferme/components/native'

export interface ThemeContext {
  theme: Colors.Theme
  setTheme: (theme: Colors.Theme) => void
}

export default createContext<ThemeContext>(null)
