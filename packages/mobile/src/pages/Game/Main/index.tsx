import React, { FC, useEffect, useCallback, useState } from 'react'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import { Player, GameStatusType } from '@la-ferme/shared/typings'

import { RootStackParamList } from '@/App/routes'

import Round from './Round'
import Menu from './Menu'
import Popups, { PopupType } from './Popups'
import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import { GET_BOX_ID } from '@/graphql/local'
import { GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'
import { READY_FOR_ROUND_MUTATION } from '@/graphql/round'
import { EVENT_TRIGGERED_SUBSCRIPTION } from '@/graphql/event'

import auth from '@/services/auth'

export interface GameMainParams {
  players: Player[]
}

type GameRouteProp = RouteProp<RootStackParamList, 'Game:Main'>
type GameNavigationProp = NavigationProp<RootStackParamList, 'Game:Main'>

export interface GameMainProps {
  route: GameRouteProp
  navigation: GameNavigationProp
}

const Game: FC<GameMainProps> = ({ navigation, route }) => {
  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID
  const players = route.params?.players ?? []

  const [popup, setPopup] = useState<PopupType>(null)

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
   * event update subscription
   */
  const eventTriggeredSubscription = useSubscription(
    EVENT_TRIGGERED_SUBSCRIPTION,
    {
      variables: { boxID }
    }
  )
  const eventData = eventTriggeredSubscription.data?.eventTriggered
  console.log(eventTriggeredSubscription)

  /**
   * game update subscription
   */
  const gameUpdatedSubscription = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { boxID }
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
      {gameData && gameData.type === GameStatusType.Round && (
        <Round
          boxID={boxID}
          userUUID={auth.uuid}
          players={players}
          data={gameData.round}
        />
      )}
      {eventData ? <Text>EVENT: {eventData.type}</Text> : null}
      <Menu boxID={boxID} userUUID={auth.uuid} setPopup={setPopup} />
      {popup && (
        <Popups
          set={setPopup}
          type={popup}
          players={players}
          boxID={boxID}
          userUUID={auth.uuid}
        />
      )}
    </FullContainer>
  )
}

export default Game
