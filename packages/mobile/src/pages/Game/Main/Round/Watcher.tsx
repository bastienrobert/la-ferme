import React, { FC } from 'react'
import { RoundStep } from '@la-ferme/shared/typings'
import { getCard } from '@la-ferme/shared/data/cards'

import { RoundProps } from './'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'

const Watcher: FC<RoundProps> = ({ players, data }) => {
  const current = players.find(player => player.uuid === data.player)

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
      // if i'm targetted, should register last in store to use sheapard-stick/speaker skill
      return (
        <Container>
          <Text>{current.character} est en train de confirmer</Text>
          <Text>Carte choisie: {card.displayName}</Text>
          {data.targets?.length > 0 &&
            data.targets.map((target, i) => {
              const player = players.find(p => p.uuid === target)
              return <Text key={i}>Cible(s): {player.character}</Text>
            })}
        </Container>
      )
    default:
      return null
  }
}

export default Watcher
