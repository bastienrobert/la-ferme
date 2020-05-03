import React, { FC } from 'react'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { Typo, Button } from '@la-ferme/components/native'

import { RootStackParamList } from '@/App/routes'

import Container from '@/components/shared/Container'

export interface GameOverParams {
  winner: string
}

type GameRouteProp = RouteProp<RootStackParamList, 'Game:GameOver'>
type GameNavigationProp = NavigationProp<RootStackParamList, 'Game:GameOver'>

export interface GameOverProps {
  route: GameRouteProp
  navigation: GameNavigationProp
}

const Game: FC<GameOverProps> = ({ navigation, route }) => {
  const routeData = route?.params

  const onHomePress = () => {
    navigation.navigate('Home:Main')
  }

  return (
    <>
      <Typo size="h1">Game over</Typo>
      <Typo size="h3">Win by {routeData?.winner}</Typo>
      <Container>
        <Button onPress={onHomePress}>Play again</Button>
      </Container>
    </>
  )
}

export default Game
