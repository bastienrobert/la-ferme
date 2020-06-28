import React from 'react'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'
// import PickCard from '@/components/shared/PickCard'
// import Header from '@/components/shared/Header'
// import AnimatedTitle from '@/components/shared/AnimatedTitle'
import CarCounter from '../Game/Main/MiniGame/CarCounter'
import { Button } from 'react-native'
// import BigCirclesWrapper from '@/components/shared/BigCirclesWrapper'
// import Walktrough from '@/pages/Onboarding/Role/Walktrough'

// import { players } from './players'

const SampleCardChoice = ({ navigation }) => {
  return (
    <Component>
      {/* <PickCard character="peter" /> */}
      {/* <Header players={players} player={players[1]} /> */}
      {/* <AnimatedTitle lines={['hello', 'there']} preset="H2" color="beige" /> */}
      {/* <BigCirclesWrapper /> */}
      <CarCounter />
      <Button onPress={() => navigation.navigate('Samples')} title="back" />
    </Component>
  )
}

const Component = styled(FullContainer)``

export default SampleCardChoice
