import React, { FC, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  UUID,
  RoundChoice,
  RoundStep,
  Round as RoundType,
  Player as PlayerType,
  Card as CardType
} from '@la-ferme/shared/typings'
import { getCard } from '@la-ferme/shared/data/cards'
import { Button } from '@la-ferme/components/native'

import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'
import PlayerSelect from '@/components/shared/PlayerSelect'

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
    case RoundStep.New:
      return (
        <Container>
          <Text>{current.character} décide davancer ou de tourner</Text>
        </Container>
      )
    case RoundStep.Card:
      return (
        <Container>
          <Text>{current.character} choisi une carte</Text>
        </Container>
      )
    case RoundStep.Confirm:
      const card = getCard(data.cards[data.choice])
      return (
        <Container>
          <Text>{current.character} est en train de confirmer</Text>
          <Text>Carte choisie: {card.displayName}</Text>
        </Container>
      )
    default:
      return null
  }
}

const Player: FC<RoundProps> = ({ boxID, userUUID, players, data }) => {
  const [playerSelect, setPlayerSelect] = useState<RoundChoice>(null)
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerType[]>([])

  const [confirmBoardRoundMutation] = useMutation(CONFIRM_BOARD_ROUND_MUTATION)
  const [setCardRoundMutation] = useMutation(SET_CARD_ROUND_MUTATION)
  const [completeCardRoundMutation] = useMutation(COMPLETE_CARD_ROUND_MUTATION)

  const onBoardPress = () => {
    confirmBoardRoundMutation({
      variables: { boxID, userUUID }
    })
  }

  const onChoicePress = (choice: RoundChoice, card: CardType) => {
    card.reward.params?.target
      ? setPlayerSelect(choice)
      : setCardRoundMutation({
          variables: { boxID, userUUID, choice }
        })
  }

  const onCompletePress = () => {
    completeCardRoundMutation({
      variables: { boxID, userUUID }
    })
  }

  const onTargetClick = target => {
    setSelectedPlayers(selectedPlayers.concat(target))
  }

  useEffect(() => {
    if (!playerSelect) return
    const card = getCard(data.cards[playerSelect])
    if (selectedPlayers.length === card.reward.params.target) {
      const targets = selectedPlayers.map(player => player.user)
      setCardRoundMutation({
        variables: { boxID, userUUID, choice: playerSelect, targets }
      })
      setSelectedPlayers([])
      setPlayerSelect(null)
    }
  }, [
    boxID,
    data.cards,
    playerSelect,
    selectedPlayers,
    setCardRoundMutation,
    userUUID
  ])

  switch (data.step) {
    case RoundStep.New:
      return (
        <Container>
          <Text>Avancer ou tourner une case</Text>
          <Container>
            <Button onPress={() => onBoardPress()}>OK</Button>
          </Container>
        </Container>
      )
    case RoundStep.Card:
      const cards = {
        civil: getCard(data.cards.civil),
        uncivil: getCard(data.cards.uncivil)
      }
      const filteredPlayers = players.filter(player => player.user !== userUUID)
      return playerSelect ? (
        <Container>
          <Text>Selected: {cards[playerSelect].displayName}</Text>
          <PlayerSelect players={filteredPlayers} onPress={onTargetClick} />
        </Container>
      ) : (
        <>
          <Container>
            <Text>Civil: {cards.civil.displayName}</Text>
            <Container>
              <Button
                onPress={() => onChoicePress(RoundChoice.Civil, cards.civil)}>
                Choose civil card
              </Button>
            </Container>
          </Container>
          <Container>
            <Text>Civil: {cards.uncivil.displayName}</Text>
            <Container>
              <Button
                onPress={() =>
                  onChoicePress(RoundChoice.Uncivil, cards.uncivil)
                }>
                Choose uncivil card
              </Button>
            </Container>
          </Container>
        </>
      )
    case RoundStep.Confirm:
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
