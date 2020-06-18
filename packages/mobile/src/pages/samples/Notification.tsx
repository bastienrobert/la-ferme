import React, { useEffect } from 'react'
import styled from 'styled-components/native'

import Notification from '@/components/shared/Notification'
import FullContainer from '@/components/shared/FullContainer'

import useTheme from '@/hooks/useTheme'

const NotificationSample = () => {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('red')
  }, [setTheme])

  return (
    <Component>
      <Notification
        title="Anonyme"
        subtitle="Une notification reçue..."
        icon="lightning"
      />
    </Component>
  )
}

const Component = styled(FullContainer)``

export default NotificationSample
