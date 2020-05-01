import React, { FC } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UUID } from '@la-ferme/shared/typings'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'

import { STOP_GAME_MUTATION } from '@/graphql/game'

export interface OverProps {
  boxID: UUID
  userUUID: UUID
}

const Over: FC<OverProps> = ({ boxID, userUUID }) => {
  const [stopGameMututation] = useMutation(STOP_GAME_MUTATION)

  const onGameOverPress = () => {
    stopGameMututation({ variables: { boxID, winnerUUID: userUUID } })
  }

  return (
    <Container>
      <Button onPress={onGameOverPress}>Game over</Button>
    </Container>
  )
}

export default Over
