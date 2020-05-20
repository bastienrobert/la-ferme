import React, { FC, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  RoundChoice,
  RoundStep,
  Player as PlayerType,
  Card as CardType
} from '@la-ferme/shared/typings'
import { getCard } from '@la-ferme/shared/data/cards'
import { Button } from '@la-ferme/components/native'

import { RoundProps } from './'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'
import PlayerSelect from '@/components/shared/PlayerSelect'

import {
  CONFIRM_BOARD_ROUND_MUTATION,
  SET_CARD_ROUND_MUTATION,
  COMPLETE_CARD_ROUND_MUTATION
} from '@/graphql/round'

import { getAllExceptCurrent } from '@/utils/helpers/players'

const Player: FC<RoundProps> = ({ player, players, data }) => {
  const [playerSelect, setPlayerSelect] = useState<RoundChoice>(null)
  const [selectedPlayers, setSelectedPlayers] = useState<PlayerType[]>([])

  const [confirmBoardRoundMutation] = useMutation(CONFIRM_BOARD_ROUND_MUTATION)
  const [setCardRoundMutation] = useMutation(SET_CARD_ROUND_MUTATION)
  const [completeCardRoundMutation] = useMutation(COMPLETE_CARD_ROUND_MUTATION)

  const onBoardPress = () => {
    confirmBoardRoundMutation({
      variables: { playerUUID: player.uuid }
    })
  }

  const onChoicePress = (choice: RoundChoice, card: CardType) => {
    card.reward.params?.target
      ? setPlayerSelect(choice)
      : setCardRoundMutation({
          variables: { playerUUID: player.uuid, choice }
        })
  }

  const onCompletePress = () => {
    completeCardRoundMutation({
      variables: { playerUUID: player.uuid }
    })
  }

  const onTargetClick = target => {
    setSelectedPlayers(selectedPlayers.concat(target))
  }

  useEffect(() => {
    if (!playerSelect) return
    const card = getCard(data.cards[playerSelect])
    if (selectedPlayers.length === card.reward.params.target) {
      const targets = selectedPlayers.map(p => p.uuid)
      setCardRoundMutation({
        variables: { playerUUID: player.uuid, choice: playerSelect, targets }
      })
      setSelectedPlayers([])
      setPlayerSelect(null)
    }
  }, [data.cards, playerSelect, player, selectedPlayers, setCardRoundMutation])

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

      return playerSelect ? (
        <Container>
          <Text>Selected: {cards[playerSelect].displayName}</Text>
          <PlayerSelect
            players={getAllExceptCurrent(players, player)}
            onPress={onTargetClick}
          />
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
          {data.targets?.length > 0 &&
            data.targets.map((target, i) => {
              const targettedPlayer = players.find(p => p.uuid === target)
              return <Text key={i}>Cible(s): {targettedPlayer.character}</Text>
            })}
          <Container>
            <Button onPress={() => onCompletePress()}>OK</Button>
          </Container>
        </Container>
      )
    default:
      return null
  }
}

export default Player
