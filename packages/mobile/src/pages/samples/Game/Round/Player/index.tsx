import React, { FC } from 'react'
import styled from 'styled-components/native'

import Container from '@/components/shared/Container'
import PickCard from '@/components/shared/PickCard'
import Title from '@/components/typo/Title'

const Player: FC = () => {
  return (
    <Component>
      <PickCard character="peter" />
    </Component>
  )
}

const Component = styled(Container)`
  width: 100%;
  flex: 1;
`

export default Player
