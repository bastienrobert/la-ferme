import React, { useEffect, useContext } from 'react'
import styled from 'styled-components/native'

import ThemeContext from '@/App/Theme/Context'

import Notification from '@/components/shared/Notification'
import FullContainer from '@/components/shared/FullContainer'

const NotificationSample = () => {
  const { setTheme } = useContext(ThemeContext)

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
