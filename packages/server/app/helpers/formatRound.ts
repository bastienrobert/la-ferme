import { Round as RoundType, RoundStep } from '@la-ferme/shared/typings'

import Round from '@/app/models/Round'
import Player from '@/app/models/Player'

export default async (round: Round, step): Promise<RoundType> => {
  const player = (await round.player().fetch()) as Player

  switch (step) {
    case RoundStep.Confirm:
      const targets = await round.targets().fetch()
      const formattedTargets = targets.map(target => target.uuid)
      return {
        player: player.uuid,
        step: round.step,
        cards: {
          civil: round.civilCard,
          uncivil: round.uncivilCard
        },
        choice: round.choice,
        targets: formattedTargets
      }
    case RoundStep.Card:
      return {
        player: player.uuid,
        step: round.step,
        cards: {
          civil: round.civilCard,
          uncivil: round.uncivilCard
        }
      }
    default:
      return {
        player: player.uuid,
        step: round.step
      }
  }
}
