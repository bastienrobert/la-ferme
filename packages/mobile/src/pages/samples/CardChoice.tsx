import React from 'react'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'
import PickCard from '@/components/shared/PickCard'
import Header from '@/components/shared/Header'
import AnimatedTitle from '@/components/shared/AnimatedTitle'
import Walktrough from '@/components/shared/Walktrough'

const players: any[] = [
  {
    uuid: 'x',
    character: 'peter',
    skill: 'happy',
    goal: 'supermarket'
  },
  {
    uuid: 'y',
    character: 'monique',
    skill: 'cellphone',
    goal: 'town-hall'
  },
  {
    uuid: 'z',
    character: 'isabelle',
    skill: 'sheperds-stick',
    goal: 'nightclub'
  },
  {
    uuid: 'd',
    character: 'leon',
    skill: 'speaker',
    goal: 'cinema'
  }
]

const SampleCardChoice = () => {
  return (
    <Component>
      {/* <PickCard character="peter" /> */}
      {/* <Header players={players} player={players[1]} /> */}
      {/* <AnimatedTitle lines={['hello', 'there']} preset="H2" color="beige" /> */}
      <Walktrough
        player={players[0]}
        onReadyPress={() => console.log('READY')}
      />
    </Component>
  )
}

const Component = styled(FullContainer)``

export default SampleCardChoice
