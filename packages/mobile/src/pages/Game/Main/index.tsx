import React, { FC, useEffect, useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import {
  Player,
  GameStatusType,
  EventType,
  UUID
} from '@la-ferme/shared/typings'

import { RootStackParamList } from '@/App/routes'

import Round from './Round'
import Menu from './Menu'
import Popups, { PopupType } from './Popups'
import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import { GET_GAME_INFOS } from '@/graphql/local'
import { GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'
import { READY_FOR_ROUND_MUTATION } from '@/graphql/round'
import { EVENT_TRIGGERED_SUBSCRIPTION } from '@/graphql/event'

export interface GameMainParams {
  players: Player[]
}

type GameRouteProp = RouteProp<RootStackParamList, 'Game:Main'>
type GameNavigationProp = NavigationProp<RootStackParamList, 'Game:Main'>

export interface GameMainProps {
  route: GameRouteProp
  navigation: GameNavigationProp
}

const getPlayerCharacter = (players: Player[], uuid: UUID) => {
  const player = players.find(p => p.uuid === uuid)
  return player ? player.character : null
}

const Game: FC<GameMainProps> = ({ navigation, route }) => {
  const playerIDQuery = useQuery(GET_GAME_INFOS)
  const { gameUUID, playerUUID } = playerIDQuery?.data ?? {}
  const players = route.params?.players ?? []

  const [popup, setPopup] = useState<PopupType>(null)

  /**
   * tell to the server you're ready to play
   */
  const [readyForRoundMutation] = useMutation(READY_FOR_ROUND_MUTATION)
  useFocusEffect(
    useCallback(() => {
      readyForRoundMutation({ variables: { playerUUID } })
    }, [playerUUID, readyForRoundMutation])
  )

  /**
   * event update subscription
   */
  const eventTriggeredSubscription = useSubscription(
    EVENT_TRIGGERED_SUBSCRIPTION,
    {
      variables: { gameUUID }
    }
  )
  const eventData = eventTriggeredSubscription.data?.eventTriggered
  console.log(eventData)

  useEffect(() => {
    if (
      eventData?.type === EventType.Report &&
      eventData?.player === playerUUID
    ) {
      Alert.alert('You have been reported')
    }
  }, [eventData, playerUUID])

  /**
   * game update subscription
   */
  const gameUpdatedSubscription = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { gameUUID }
  })
  const gameData = gameUpdatedSubscription.data?.gameUpdated
  const numberOfRounds = gameData?.numberOfRounds

  useEffect(() => {
    if (!gameData || gameData.type !== GameStatusType.End) return
    const winner = gameData.winnerUUID
    navigation.navigate('Game:GameOver', { winner })
  }, [gameData, navigation])

  return (
    <FullContainer>
      <Title preset="H1">Game</Title>
      {typeof numberOfRounds === 'number' ? (
        <Text>
          CURRENT ROUND: {Math.floor((numberOfRounds - 1) / players.length) + 1}
        </Text>
      ) : null}
      {eventData ? (
        <Text>
          LAST EVENT: {eventData.type} TARGET{' '}
          {getPlayerCharacter(players, eventData.player)}
        </Text>
      ) : null}
      {gameData && gameData.type === GameStatusType.Round && (
        <Round
          gameUUID={gameUUID}
          playerUUID={playerUUID}
          players={players}
          data={gameData.round}
        />
      )}
      <Menu playerUUID={playerUUID} setPopup={setPopup} />
      {popup && (
        <Popups
          set={setPopup}
          type={popup}
          players={players}
          playerUUID={playerUUID}
        />
      )}
    </FullContainer>
  )
}

export default Game
