import React, { FC, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { RoundStep } from '@la-ferme/shared/typings'

import { RoundViewProps } from '../'
import NewOrCard from './NewOrCard'
import Confirm from './Confirm'

import { SET_LAST_TARGETER_MUTATION } from '@/graphql/local'

const Spectator: FC<RoundViewProps> = props => {
  const { player, players, data } = props
  const [setLastTargeter] = useMutation(SET_LAST_TARGETER_MUTATION)

  const current = players.find(p => p.uuid === data.player)

  useEffect(() => {
    if (data.step !== RoundStep.Confirm) return
    if (data.targets && data.targets.includes(player.uuid)) {
      setLastTargeter({ variables: { targeter: data.player } })
    }
  }, [data, player.uuid, setLastTargeter])

  switch (data.step) {
    case RoundStep.New:
    case RoundStep.Card:
      return <NewOrCard player={current} step={data.step} />
    case RoundStep.Confirm:
      return <Confirm {...props} />
    // const card = getCard(data.cards[data.choice])
    // return (
    //   <Container>
    //     <Text>{current.character} est en train de confirmer</Text>
    //     <Text>Carte choisie: {card.displayName}</Text>
    //     {data.targets?.length > 0 &&
    //       data.targets.map((target, i) => {
    //         const { character } = players.find(p => p.uuid === target)
    //         return <Text key={i}>Cible(s): {character}</Text>
    //       })}
    //   </Container>
    // )
    default:
      return null
  }
}

export default Spectator