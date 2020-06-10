import { useLayoutEffect, useRef, RefObject } from 'react'
import { gsap } from 'gsap'

import Draggable from 'gsap/dist/Draggable'
import InertiaPlugin from 'gsap/dist/InertiaPlugin'

export default (
  target: RefObject<any>,
  config: Draggable.Vars,
  deps: any[] = []
) => {
  const draggable = useRef<Draggable[]>()

  useLayoutEffect(() => {
    gsap.registerPlugin(Draggable, InertiaPlugin)
  }, [])

  useLayoutEffect(() => {
    if (!draggable.current) {
      draggable.current = Draggable.create(target.current, config)
    }

    return () => {
      if (!draggable.current) return
      draggable.current[0].kill()
      draggable.current = null
    }
  }, deps)

  return draggable
}
