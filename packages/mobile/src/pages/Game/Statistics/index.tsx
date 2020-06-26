import React, { FC } from 'react'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { Typo, Button } from '@la-ferme/components/native'
import {
  UUID,
  Player as PlayerType,
  PlayerUUIDWithStatistic
} from '@la-ferme/shared/typings'

import { RootStackParamList } from '@/App/routes'

import Container from '@/components/shared/Container'

export interface GameStatisticsParams {
  winner: UUID
  players: PlayerType[]
  statistics: PlayerUUIDWithStatistic
}

type StatisticsRouteProp = RouteProp<RootStackParamList, 'Game:Statistics'>
type StatisticsNavigationProp = NavigationProp<
  RootStackParamList,
  'Game:Statistics'
>

export interface StatisticsProps {
  route: StatisticsRouteProp
  navigation: StatisticsNavigationProp
}

const Statistics: FC<StatisticsProps> = ({ navigation, route }) => {
  const routeData = route?.params
  console.log(routeData)

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

export default Statistics
