import { Collection } from 'bookshelf'

import { REGULARIZATION } from '@la-ferme/shared/constants'
import { EventType, RegularizationName } from '@la-ferme/shared/typings'

import Player from '@/app/models/Player'
import Game from '@/app/models/Game'

import pubsub from '@/app/pubsub'

const PENALTY_SCORE = -1.5
const REWARD_SCORE = 1.5

const getName = average => {
  if (average < PENALTY_SCORE) return RegularizationName.Penalty
  if (average > REWARD_SCORE) return RegularizationName.Reward
}

const resetPlayerScore = (
  name: RegularizationName,
  players: Collection<Player>
) => {
  return players.map(player => {
    switch (name) {
      case RegularizationName.Penalty:
        player.increase(1)
        break
      case RegularizationName.Reward:
        player.increase(-1)
        break
    }
    return player.save()
  })
}

export default async (game: Game, players: Collection<Player>) => {
  const scores = players.reduce((acc, p) => acc + p.score, 0)
  const average = scores / players.length

  const name = getName(average)

  if (name) {
    pubsub.publish(REGULARIZATION.CREATE, {
      eventTriggered: {
        gameUUID: game.uuid,
        type: EventType.Regularization,
        name
      }
    })

    return await Promise.all(resetPlayerScore(name, players))
  }
}
