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

import { GET_BOX_ID } from '@/graphql/local'
import { GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'
import { READY_FOR_ROUND_MUTATION } from '@/graphql/round'

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
   * navigate to GameOver screen if winner
   */
  const gameUpdatedSubscription = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { boxID }
  })
  const data = gameUpdatedSubscription.data?.gameUpdated

  useEffect(() => {
    if (!data || data.type !== GameStatusType.END) return
    const winner = data.winnerUUID
    navigation.navigate('Game:GameOver', { winner })
  }, [data, navigation])

  return (
    <FullContainer>
      <Title preset="H1">Game</Title>
      {data && data.type === GameStatusType.ROUND && (
        <Round boxID={boxID} userUUID={auth.uuid} data={data.round} />
      )}
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
