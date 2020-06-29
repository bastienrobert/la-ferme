import { useLayoutEffect } from 'react'
import viewport from '@/services/viewport'

export default (callback: () => void) => {
  useLayoutEffect(() => {
    viewport.on('resize', callback)
    return () => {
      viewport.off('resize', callback)
    }
  }, [])
}
