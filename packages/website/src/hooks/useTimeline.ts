import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'

export default (
  config: gsap.TimelineVars,
  buildTl: (tl: gsap.core.Timeline) => void
) => {
  const tl = useRef(gsap.timeline(config))

  useLayoutEffect(() => {
    if (!tl.current) {
      tl.current = gsap.timeline(config)
    }

    buildTl(tl.current)

    return () => {
      tl.current.kill()
      tl.current = null
    }
  })

  return tl.current
}
