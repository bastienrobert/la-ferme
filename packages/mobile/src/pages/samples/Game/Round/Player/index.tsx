import React, { FC } from 'react'
import styled from 'styled-components/native'

import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'

const Player: FC<any> = () => {
  return (
    <Component>
      <Title color="beige">Player</Title>
    </Component>
  )
}

const Component = styled(Container)`
  width: 100%;
  flex: 1;
`

export default Player
