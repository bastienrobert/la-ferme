import React, { FC } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { UUID, RoundChoice, RoundStep } from '@la-ferme/shared/typings'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'

import {
  CONFIRM_BOARD_ROUND_MUTATION,
  SET_CARD_ROUND_MUTATION
} from '@/graphql/round'

export interface RoundProps {
  data: any
  boxID: UUID
  userUUID: UUID
}

const Submit: FC<any> = ({ boxID, userUUID, data }) => {
  const [confirmBoardRoundMutation] = useMutation(CONFIRM_BOARD_ROUND_MUTATION)
  const [setCardRoundMutation] = useMutation(SET_CARD_ROUND_MUTATION)

  const onBoardPress = () => {
    confirmBoardRoundMutation({
      variables: { boxID, userUUID }
    })
  }

  const onChoicePress = (choice: RoundChoice) => {
    setCardRoundMutation({
      variables: { boxID, userUUID, choice }
    })
  }

  return data.step === RoundStep.NEW ? (
    <Container>
      <Button onPress={() => onBoardPress()}>Step board</Button>
    </Container>
  ) : (
    <>
      <Container>
        <Button onPress={() => onChoicePress(RoundChoice.CIVIL)}>
          Choose civil card
        </Button>
      </Container>
      <Container>
        <Button onPress={() => onChoicePress(RoundChoice.UNCIVIL)}>
          Choose uncivil card
        </Button>
      </Container>
    </>
  )
}

const Round: FC<RoundProps> = ({ data, boxID, userUUID }) => {
  return (
    <Container>
      <Text>Round</Text>
      {!data && <Text>No round data yet</Text>}
      {data && <Text>New round for user</Text>}
      {data && <Text>{data.user}</Text>}
      {data && <Text>Step : {data.step}</Text>}
      {data && data.user === userUUID && (
        <Submit boxID={boxID} userUUID={userUUID} data={data} />
      )}
    </Container>
  )
}

export default Round
