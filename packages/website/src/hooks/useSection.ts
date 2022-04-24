import { useEffect } from 'react'
import { useInView, IntersectionOptions } from 'react-intersection-observer'

import menu from '@/services/menu'

export default (section: string, options?: IntersectionOptions) => {
  const [ref, inView] = useInView(options)

  useEffect(() => {
    if (inView) menu.section = section
  }, [inView])

  return ref
}
