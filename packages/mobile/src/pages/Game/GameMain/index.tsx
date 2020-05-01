import React, { FC, useEffect, useCallback } from 'react'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import { Player } from '@la-ferme/shared/typings'

import { RootStackParamList } from '@/App/routes'

import Over from './Over'
import Round from './Round'
import Report from './Report'
import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'

import { GAME_STATUS_SUBSCRIPTION } from '@/graphql/game'
import { READY_FOR_ROUND_MUTATION } from '@/graphql/round'
import { GET_BOX_ID } from '@/graphql/room'

import auth from '@/services/auth'

export interface GameMainParams {
  players: Player[]
}

type GameRouteProp = RouteProp<RootStackParamList, 'GameMain'>
type GameNavigationProp = NavigationProp<RootStackParamList, 'GameMain'>

export interface GameMainProps {
  route: GameRouteProp
  navigation: GameNavigationProp
}

const Game: FC<GameMainProps> = ({ navigation, route }) => {
  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID
  const players = route.params?.players ?? []

  /**
   * tell to the server you're ready to play
   */
  const [readyForRoundMutation] = useMutation(READY_FOR_ROUND_MUTATION)
  useFocusEffect(
    useCallback(() => {
      readyForRoundMutation({ variables: { boxID, userUUID: auth.uuid } })
    }, [boxID, readyForRoundMutation])
  )

  /**
   * navigate to GameOver screen if winner
   */
  const gameStatusSubscription = useSubscription(GAME_STATUS_SUBSCRIPTION, {
    variables: { boxID }
  })
  useEffect(() => {
    const winner = gameStatusSubscription.data?.gameStatus?.winnerUUID
    if (!winner) return
    navigation.navigate('Game:GameOver', { winner })
  }, [gameStatusSubscription.data, navigation])

  return (
    <FullContainer>
      <Title preset="H1">Game</Title>
      <Round boxID={boxID} userUUID={auth.uuid} />
      <Over boxID={boxID} userUUID={auth.uuid} />
      <Report players={players} boxID={boxID} userUUID={auth.uuid} />
    </FullContainer>
  )
}

export default Game
