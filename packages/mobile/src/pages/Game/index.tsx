import React, { FC, useEffect, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import { STOP_GAME_MUTATION, GAME_STATUS_SUBSCRIPTION } from '@/graphql/game'
import {
  READY_FOR_ROUND_MUTATION,
  PUSH_ROUND_MUTATION,
  NEW_ROUND_SUBSCRIPTION
} from '@/graphql/round'
import { GET_BOX_ID } from '@/graphql/room'
import auth from '@/utils/auth'

const Game: FC<any> = ({ navigation }) => {
  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const [readyForRoundMutation] = useMutation(READY_FOR_ROUND_MUTATION)
  const [pushRoundMutation] = useMutation(PUSH_ROUND_MUTATION)

  useFocusEffect(
    useCallback(() => {
      readyForRoundMutation({ variables: { boxID, userUUID: auth.uuid } })
    }, [boxID, readyForRoundMutation])
  )

  const [stopGameMututation] = useMutation(STOP_GAME_MUTATION)
  const gameStatusSubscription = useSubscription(GAME_STATUS_SUBSCRIPTION, {
    variables: { boxID }
  })

  useEffect(() => {
    const winner = gameStatusSubscription.data?.gameStatus?.winnerUUID
    if (!winner) return
    navigation.navigate('GameOver', { winner })
  }, [gameStatusSubscription.data, navigation])

  const newRoundSubscription = useSubscription(NEW_ROUND_SUBSCRIPTION, {
    variables: { boxID }
  })

  const onSubmitRoundPress = () => {
    pushRoundMutation({ variables: { boxID, userUUID: auth.uuid } })
  }

  const onGameOverPress = () => {
    stopGameMututation({ variables: { boxID, winnerUUID: auth.uuid } })
  }

  const newRoundData = newRoundSubscription.data?.newRound?.round

  return (
    <>
      <Typo size="h1">Game</Typo>
      <Typo size="h3">Round</Typo>
      {!newRoundData && <Typo>No round data yet</Typo>}
      {newRoundData && <Typo>New round for user</Typo>}
      {newRoundData && <Typo>{newRoundData.user}</Typo>}
      {newRoundData && newRoundData.user === auth.uuid && (
        <Button onPress={onSubmitRoundPress}>Submit round</Button>
      )}
      <Button key="game-over" onPress={onGameOverPress}>
        Game over
      </Button>
      {gameStatusSubscription.data?.gameStatus?.winnerUUID && <Typo>WON</Typo>}
    </>
  )
}

export default Game
