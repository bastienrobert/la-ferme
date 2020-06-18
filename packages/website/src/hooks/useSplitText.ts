import { useLayoutEffect, useRef, RefObject } from 'react'
import { gsap } from 'gsap'

import SplitText from 'gsap/dist/SplitText'

export default (
  target: RefObject<gsap.DOMTarget>,
  config: SplitText.Vars,
  deps: any[] = []
) => {
  const splittext = useRef<SplitText>()

  useLayoutEffect(() => {
    gsap.registerPlugin(SplitText)
  }, [])

  useLayoutEffect(() => {
    if (!splittext.current) {
      splittext.current = new SplitText(target.current, config)
    }
  }, deps)

  return splittext
}
