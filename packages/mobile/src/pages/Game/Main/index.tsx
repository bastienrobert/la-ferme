import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import {
  Player as PlayerType,
  GameStatusType,
  EventType
} from '@la-ferme/shared/typings'
import { characters } from '@la-ferme/shared/data'

import { RootStackParamList } from '@/App/routes'

import Notifications, {
  NotificationsProps,
  NotificationType
} from './Notifications'
import Round from './Round'
import Menu from './Menu'
import Popup, { PopupType } from './Popup'
import Header from '@/components/shared/Header'
import FullContainer from '@/components/shared/FullContainer'

import { GAME_PLAYER_INFOS_QUERY } from '@/graphql/local'
import { GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'
import { READY_FOR_ROUND_MUTATION } from '@/graphql/round'
import { EVENT_TRIGGERED_SUBSCRIPTION } from '@/graphql/event'

import useTheme from '@/hooks/useTheme'

export interface GameMainParams {
  players: PlayerType[]
}

type GameMainRouteProp = RouteProp<RootStackParamList, 'Game:Main'>
type GameMainNavigationProp = NavigationProp<RootStackParamList, 'Game:Main'>

export interface GameMainProps {
  route: GameMainRouteProp
  navigation: GameMainNavigationProp
}

const Game: FC<GameMainProps> = ({ navigation, route }) => {
  const { setTheme } = useTheme()
  const gamePlayerInfosQuery = useQuery(GAME_PLAYER_INFOS_QUERY)
  const { gameUUID, player } = gamePlayerInfosQuery?.data ?? {}
  const players = route.params?.players ?? []

  const [popup, setPopup] = useState<PopupType>(undefined)
  const [notification, setNotification] = useState<NotificationsProps>(
    undefined
  )

  /**
   * tell to the server you're ready to play
   */
  const [readyForRoundMutation] = useMutation(READY_FOR_ROUND_MUTATION)
  useEffect(() => {
    readyForRoundMutation({ variables: { playerUUID: player.uuid } })
  }, [player, readyForRoundMutation])

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
        if (eventData.targets.includes(player?.uuid)) {
          setPopup(PopupType.PhoneCall)
        }
        break
      case EventType.Regularization:
        setNotification({
          type: NotificationType.Regularization,
          params: {
            event: eventData.name
          }
        })
        break
      case EventType.Skill:
        const from = players.find(p => p.uuid === eventData.player)
        const targets = eventData.targets.map(t => {
          return players.find(p => p.uuid === t)?.character
        })
        if (from.uuid === player.uuid) return
        setNotification({
          type: NotificationType.Skill,
          params: {
            skill: eventData.skill,
            from,
            targets
          }
        })
        break
      case EventType.MiniGame:
        console.log(eventData)
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
    const statistics = gameData.statistics
    navigation.navigate('Game:Statistics', {
      winner,
      players,
      player,
      statistics
    })
  }, [gameData, navigation, player, players])

  useEffect(() => {
    if (!gameData?.round || popup !== undefined) return
    setTheme(gameData.round.background)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popup])

  const character = characters.find(c => player.character === c.name)

  return (
    <Component overflow={popup ? 'hidden' : 'visible'}>
      <Header
        player={player}
        players={players}
        numberOfRounds={numberOfRounds}
      />
      {gameData && gameData.type === GameStatusType.Round && (
        <Round
          gameUUID={gameUUID}
          player={player}
          character={character}
          players={players}
          shouldBackgroundUpdate={!popup}
          data={gameData.round}
        />
      )}
      {!popup && <Menu player={player} setPopup={setPopup} />}
      <Popup set={setPopup} type={popup} players={players} player={player} />
      <Notifications {...notification} />
    </Component>
  )
}

const Component = styled(FullContainer)<any>`
  width: 100%;
  overflow: ${({ overflow }) => overflow};
`

export default Game
