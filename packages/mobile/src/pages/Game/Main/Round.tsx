import React, { FC } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  UUID,
  RoundChoice,
  RoundStep,
  Round as RoundType,
  Player as PlayerType
} from '@la-ferme/shared/typings'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'

import {
  CONFIRM_BOARD_ROUND_MUTATION,
  SET_CARD_ROUND_MUTATION,
  COMPLETE_CARD_ROUND_MUTATION
} from '@/graphql/round'

export interface RoundProps {
  data: RoundType
  players: PlayerType[]
  boxID: UUID
  userUUID: UUID
}

const Watcher: FC<RoundProps> = ({ players, data }) => {
  const current = players.find(player => player.user === data.user)

  switch (data.step) {
    case RoundStep.NEW:
      return (
        <Container>
          <Text>{current.character} décide davancer ou de tourner</Text>
        </Container>
      )
    case RoundStep.CARD:
      return (
        <Container>
          <Text>{current.character} choisi une carte</Text>
        </Container>
      )
    case RoundStep.CONFIRM:
      return (
        <Container>
          <Text>{current.character} est en train de confirmer</Text>
          <Text>
            Carte choisie: {data.choice} {data.cards[data.choice]}
          </Text>
        </Container>
      )
    default:
      return null
  }
}

const Player: FC<RoundProps> = ({ boxID, userUUID, data }) => {
  const [confirmBoardRoundMutation] = useMutation(CONFIRM_BOARD_ROUND_MUTATION)
  const [setCardRoundMutation] = useMutation(SET_CARD_ROUND_MUTATION)
  const [completeCardRoundMutation] = useMutation(COMPLETE_CARD_ROUND_MUTATION)

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

  const onCompletePress = () => {
    completeCardRoundMutation({
      variables: { boxID, userUUID }
    })
  }

  switch (data.step) {
    case RoundStep.NEW:
      return (
        <Container>
          <Text>Avancer ou tourner une case</Text>
          <Container>
            <Button onPress={() => onBoardPress()}>OK</Button>
          </Container>
        </Container>
      )
    case RoundStep.CARD:
      return (
        <>
          <Container>
            <Text>Civil: {data.cards.civil}</Text>
            <Container>
              <Button onPress={() => onChoicePress(RoundChoice.CIVIL)}>
                Choose civil card
              </Button>
            </Container>
          </Container>
          <Container>
            <Text>Civil: {data.cards.uncivil}</Text>
            <Container>
              <Button onPress={() => onChoicePress(RoundChoice.UNCIVIL)}>
                Choose uncivil card
              </Button>
            </Container>
          </Container>
        </>
      )
    case RoundStep.CONFIRM:
      return (
        <Container>
          <Text>
            Carte choisie: {data.choice} {data.cards[data.choice]}
          </Text>
          <Container>
            <Button onPress={() => onCompletePress()}>OK</Button>
          </Container>
        </Container>
      )
    default:
      return null
  }
}

const Round: FC<RoundProps> = props => {
  const { data, userUUID } = props
  return (
    <Container>
      <Text>Round</Text>
      {!data && <Text>No round data yet</Text>}
      {data && <Text>New round for user</Text>}
      {data && <Text>{data.user}</Text>}
      {data && <Text>Step : {data.step}</Text>}
      {data &&
        (data.user === userUUID ? (
          <Player {...props} />
        ) : (
          <Watcher {...props} />
        ))}
    </Container>
  )
}

export default Round
