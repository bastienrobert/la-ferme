import { useState, useLayoutEffect } from 'react'
import menu from '@/services/menu'

export default () => {
  const [section, setSection] = useState<string>()

  useLayoutEffect(() => {
    menu.on('change', setSection)
    return () => {
      menu.off('change', setSection)
    }
  }, [])

  return section
}
