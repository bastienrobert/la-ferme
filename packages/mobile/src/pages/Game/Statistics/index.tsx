import React, { FC } from 'react'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import {
  UUID,
  GameStatistics,
  Player as PlayerType
} from '@la-ferme/shared/typings'

import { RootStackParamList } from '@/App/routes'

import StatisticsCards from './StatisticsCards'

export interface GameStatisticsParams {
  winner: UUID
  player: PlayerType
  players: PlayerType[]
  statistics: GameStatistics
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

  const onHomePress = () => {
    navigation.navigate('Home:Main')
  }

  if (!routeData) {
    onHomePress()
    return null
  }

  return <StatisticsCards onPress={onHomePress} {...routeData} />
}

export default Statistics
