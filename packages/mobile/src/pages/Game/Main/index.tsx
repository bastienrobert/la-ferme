import React, { FC, useEffect, useCallback, useState } from 'react'
import { Alert } from 'react-native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import {
  Player as PlayerType,
  GameStatusType,
  EventType
} from '@la-ferme/shared/typings'

import { RootStackParamList } from '@/App/routes'

import NotificationBanner from './NotificationBanner'
import RoundNumber from './RoundNumber'
import Round from './Round'
import Menu from './Menu'
import Popups, { PopupType } from './Popups'
import Text from '@/components/typo/Text'
import FullContainer from '@/components/shared/FullContainer'

import { GAME_PLAYER_INFOS_QUERY } from '@/graphql/local'
import { GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'
import { READY_FOR_ROUND_MUTATION } from '@/graphql/round'
import { EVENT_TRIGGERED_SUBSCRIPTION } from '@/graphql/event'

export interface GameMainParams {
  players: PlayerType[]
}

type GameRouteProp = RouteProp<RootStackParamList, 'Game:Main'>
type GameNavigationProp = NavigationProp<RootStackParamList, 'Game:Main'>

export interface GameMainProps {
  route: GameRouteProp
  navigation: GameNavigationProp
}

const Game: FC<GameMainProps> = ({ navigation, route }) => {
  const gamePlayerInfosQuery = useQuery(GAME_PLAYER_INFOS_QUERY)
  const { gameUUID, player } = gamePlayerInfosQuery?.data ?? {}
  const players = route.params?.players ?? []

  const [popup, setPopup] = useState<PopupType | null>(null)
  const [banner, setBanner] = useState<string | null>(null)

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

  useEffect(() => {
    switch (eventData?.type) {
      case EventType.Report:
        if (eventData.player === player?.uuid) {
          Alert.alert(`You have been reported ${eventData.status}`)
        }
        break
      case EventType.Skill:
        const from = players.find(p => p.uuid === eventData.player)
        const targets = eventData.targets
          .map(t => players.find(p => p.uuid === t)?.character)
          .join(' ')
        setBanner(
          from.character + ' used ' + eventData.skill + ' on ' + targets
        )
        break
      default:
        break
    }
  }, [eventData, player, players])

  /**
   * game update subscription
   */
  const gameUpdatedSubscription = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { gameUUID }
  })
  const gameData = gameUpdatedSubscription.data?.gameUpdated
  const numberOfRounds = gameData?.numberOfRounds

  useEffect(() => {
    if (gameData?.type !== GameStatusType.End) return
    const winner = gameData.winnerUUID
    navigation.navigate('Game:GameOver', { winner })
  }, [gameData, navigation])

  return (
    <FullContainer>
      <Text>
        {player.character} - {player.skill}
      </Text>
      <RoundNumber players={players} numberOfRounds={numberOfRounds} />
      <NotificationBanner content={banner} />
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
