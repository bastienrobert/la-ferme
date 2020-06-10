import { useLayoutEffect } from 'react'
import viewport from '@/services/viewport'

function useOnResize(callback: () => void) {
  useLayoutEffect(() => {
    viewport.on('resize', callback)
    return () => {
      viewport.off('resize', callback)
    }
  }, [])
}

export default useOnResize
