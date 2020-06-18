import React from 'react'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'
import SlideToAnswer from '@/components/shared/SlideToAnswer'

const CallSample = () => {
  return (
    <Component>
      <SlideToAnswer onHangUp={() => console.log('HANG UP')} />
    </Component>
  )
}

const Component = styled(FullContainer)``

export default CallSample
