import { Collection } from 'bookshelf'

import { REGULARIZATION } from '@la-ferme/shared/constants'
import { PENALTY_SCORE, REWARD_SCORE } from '@la-ferme/shared/settings'
import { EventType, RegularizationName } from '@la-ferme/shared/typings'

import Player from '@/app/models/Player'
import Game from '@/app/models/Game'
import Regularization from '@/app/models/Regularization'

import pubsub from '@/app/pubsub'

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
    await new Regularization({
      game_id: game.id,
      name
    }).save()

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
