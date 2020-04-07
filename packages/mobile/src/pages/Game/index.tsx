import React, { FC } from 'react'
import { useMutation, useSubscription, useQuery } from '@apollo/react-hooks'
import { Typo, Button } from '@la-ferme/components/native'

import { STOP_GAME_MUTATION, GAME_STATUS_SUBSCRIPTION } from '@/graphql/game'
import { GET_BOX_ID } from '@/graphql/room'
import auth from '@/utils/auth'

const Game: FC<any> = () => {
  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const [stopGameMututation] = useMutation(STOP_GAME_MUTATION)
  const gameStatusSubscription = useSubscription(GAME_STATUS_SUBSCRIPTION, {
    variables: { boxID }
  })

  const onGameOverPress = () => {
    stopGameMututation({ variables: { boxID, winnerUUID: auth.uuid } })
  }

  return (
    <>
      <Typo>Game</Typo>
      <Button key="game-over" onPress={onGameOverPress}>
        Game over
      </Button>
      {gameStatusSubscription.data?.gameStatus?.winnerUUID && <Typo>WON</Typo>}
    </>
  )
}

export default Game
