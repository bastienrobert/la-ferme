import React from 'react'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'
import PickCard from '@/components/shared/PickCard'
import Header from '@/components/shared/Header'
import AnimatedTitle from '@/components/shared/AnimatedTitle'

const players: any[] = [
  {
    uuid: 'x',
    character: 'peter'
  },
  {
    uuid: 'y',
    character: 'monique'
  },
  {
    uuid: 'z',
    character: 'isabelle'
  },
  {
    uuid: 'd',
    character: 'leon'
  }
]

const SampleCardChoice = () => {
  return (
    <Component>
      {/* <PickCard character="peter" /> */}
      {/* <Header players={players} player={players[1]} /> */}
      <AnimatedTitle lines={['hello', 'there']} preset="H2" color="beige" />
    </Component>
  )
}

const Component = styled(FullContainer)``

export default SampleCardChoice
