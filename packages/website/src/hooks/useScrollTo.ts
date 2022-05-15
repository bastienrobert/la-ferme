import { useLayoutEffect, useCallback } from 'react'
import { gsap } from 'gsap'

import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export default to => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollToPlugin)
  }, [])

  const tween = useCallback(() => {
    gsap.to(window, { duration: 0.4, scrollTo: to })
  }, [to])

  return tween
}
