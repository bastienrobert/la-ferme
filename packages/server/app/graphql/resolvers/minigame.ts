import { UUID, EventType } from '@la-ferme/shared/typings'
import { MINI_GAME } from '@la-ferme/shared/constants'

import MiniGame from '@/app/models/MiniGame'

import pubsub from '@/app/pubsub'
import Game from '@/app/models/Game'

const publishResults = (gameUUID: UUID, { winner, name, miniGameUUID }) => {
  pubsub.publish(MINI_GAME.SCORE, {
    eventTriggered: {
      gameUUID,
      name,
      miniGameUUID,
      type: EventType.MiniGameScore,
      winner
    }
  })
}

const checkIfEveryBodyHasScored = async (miniGame: MiniGame) => {
  const miniGamePlayers = await miniGame.miniGamePlayers().fetch({
    withRelated: ['player']
  })
  const serializedPlayers = miniGamePlayers.serialize()
  const everyBodyHasScored = serializedPlayers.every(
    player => player.score !== null
  )

  if (everyBodyHasScored) {
    const game = miniGame.related('game') as Game
    const orderedPlayers = serializedPlayers.sort((a, b) => b.score - a.score)
    const winner = orderedPlayers[0]
    publishResults(game.uuid, {
      winner: winner.player.uuid,
      name: miniGame.name,
      miniGameUUID: miniGame.uuid
    })
  }
}

const resolvers = {
  Mutation: {
    // set game as ready
    async submitMiniGame(_, { playerUUID, miniGameUUID, score }) {
      const miniGame = await MiniGame.findByUUID(miniGameUUID, {
        withRelated: ['game', 'miniGamePlayers']
      })

      const miniGamePlayerReq = await miniGame
        .related('miniGamePlayers')
        .query(qb =>
          qb
            .join('players', 'mini_games_players.player_id', 'players.id')
            .where('players.uuid', playerUUID)
        )
        .fetch()

      const miniGamePlayer = miniGamePlayerReq.first()
      if (miniGamePlayer) {
        miniGamePlayer.score = score
        await miniGamePlayer.save()
      }

      await checkIfEveryBodyHasScored(miniGame)

      return true
    }
  }
}

export default resolvers
