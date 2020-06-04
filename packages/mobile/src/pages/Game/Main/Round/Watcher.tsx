import React, { FC, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { RoundStep } from '@la-ferme/shared/typings'
import { getCard } from '@la-ferme/shared/data/cards'

import { RoundProps } from './'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'

import { SET_LAST_TARGETER_MUTATION } from '@/graphql/local'

const Watcher: FC<RoundProps> = ({ player, players, data }) => {
  const [setLastTargeter] = useMutation(SET_LAST_TARGETER_MUTATION)

  const current = players.find(p => p.uuid === data.player)

  console.log(players)

  useEffect(() => {
    if (data.step !== RoundStep.Confirm) return
    if (data.targets && data.targets.includes(player.uuid)) {
      setLastTargeter({ variables: { targeter: data.player } })
    }
  }, [data, player.uuid, setLastTargeter])

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
          {data.targets?.length > 0 &&
            data.targets.map((target, i) => {
              const { character } = players.find(p => p.uuid === target)
              return <Text key={i}>Cible(s): {character}</Text>
            })}
        </Container>
      )
    default:
      return null
  }
}

export default Watcher
