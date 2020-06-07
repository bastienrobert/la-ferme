import React, { FC } from 'react'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { Typo, Button } from '@la-ferme/components/native'
import { Player as PlayerType } from '@la-ferme/shared/typings'

import { RootStackParamList } from '@/App/routes'

import Container from '@/components/shared/Container'

export interface GameOverParams {
  winner: PlayerType
}

type GameOverRouteProp = RouteProp<RootStackParamList, 'Game:Over'>
type GameOverNavigationProp = NavigationProp<RootStackParamList, 'Game:Over'>

export interface GameOverProps {
  route: GameOverRouteProp
  navigation: GameOverNavigationProp
}

const GameOver: FC<GameOverProps> = ({ navigation, route }) => {
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

export default GameOver
