import React, { FC } from 'react'
import { useMutation, useSubscription } from '@apollo/react-hooks'
import { UUID } from '@la-ferme/shared/typings'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'

import { PUSH_ROUND_MUTATION, NEW_ROUND_SUBSCRIPTION } from '@/graphql/round'

export interface RoundProps {
  boxID: UUID
  userUUID: UUID
}

const Over: FC<RoundProps> = ({ boxID, userUUID }) => {
  const [pushRoundMutation] = useMutation(PUSH_ROUND_MUTATION)

  const onSubmitRoundPress = () => {
    pushRoundMutation({ variables: { boxID, userUUID: userUUID } })
  }

  const newRoundSubscription = useSubscription(NEW_ROUND_SUBSCRIPTION, {
    variables: { boxID }
  })

  const newRoundData = newRoundSubscription.data?.newRound?.round

  return (
    <Container>
      <Text>Round</Text>
      {!newRoundData && <Text>No round data yet</Text>}
      {newRoundData && <Text>New round for user</Text>}
      {newRoundData && <Text>{newRoundData.user}</Text>}
      {newRoundData && newRoundData.user === userUUID && (
        <Container>
          <Button onPress={onSubmitRoundPress}>Submit round</Button>
        </Container>
      )}
    </Container>
  )
}

export default Over
