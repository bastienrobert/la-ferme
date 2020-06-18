import { useEffect } from 'react'

import bus from '@/services/bus'

export default (event: string, callback: (...args: any[]) => any) => {
  useEffect(() => {
    bus.addListener(event, callback)
    return () => bus.removeListener(event, callback)
  }, [event, callback])
}
