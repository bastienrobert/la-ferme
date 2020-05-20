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

import RoundNumber from './RoundNumber'
import Round from './Round'
import Menu from './Menu'
import Popups, { PopupType } from './Popups'
import FullContainer from '@/components/shared/FullContainer'
import Text from '@/components/typo/Text'

import { GAME_PLAYER_INFOS_QUERY } from '@/graphql/local'
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
  const gamePlayerInfosQuery = useQuery(GAME_PLAYER_INFOS_QUERY)

  const { gameUUID, player } = gamePlayerInfosQuery?.data ?? {}

  const players = route.params?.players ?? []

  const [popup, setPopup] = useState<PopupType>(null)

  /**
   * tell to the server you're ready to play
   */
  const [readyForRoundMutation] = useMutation(READY_FOR_ROUND_MUTATION)
  useFocusEffect(
    useCallback(() => {
      readyForRoundMutation({ variables: { playerUUID: player.uuid } })
    }, [player, readyForRoundMutation])
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
  // console.log(eventData)

  useEffect(() => {
    if (
      eventData?.type === EventType.Report &&
      eventData?.player === player.uuid
    ) {
      Alert.alert('You have been reported')
    }
  }, [eventData, player])

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
      <RoundNumber players={players} numberOfRounds={numberOfRounds} />
      {eventData ? (
        <Text>
          LAST EVENT: {eventData.type} TARGET{' '}
          {getPlayerCharacter(players, eventData.player)}
        </Text>
      ) : null}
      {gameData && gameData.type === GameStatusType.Round && (
        <Round
          gameUUID={gameUUID}
          player={player}
          players={players}
          data={gameData.round}
        />
      )}
      <Menu player={player} setPopup={setPopup} />
      {popup && (
        <Popups set={setPopup} type={popup} players={players} player={player} />
      )}
    </FullContainer>
  )
}

export default Game
