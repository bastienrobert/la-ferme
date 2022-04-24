import { PLAYER } from '@la-ferme/shared/constants'
import { Player as PlayerType, GameStatusType } from '@la-ferme/shared/typings'

import pubsub from '@/app/pubsub'

import Game from '@/app/models/Game'
import Player from '@/app/models/Player'

import formatPlayers, { formatPlayer } from '@/app/helpers/formatPlayers'

const resolvers = {
  Query: {
    async getPlayer(_, { playerUUID }): Promise<PlayerType> {
      const player = await Player.findByUUID(playerUUID)

      const formattedPlayer = await formatPlayer(player)
      return formattedPlayer
    }
  },
  Mutation: {
    async playerReady(_, { playerUUID }) {
      const player = await Player.findByUUID(playerUUID, {
        withRelated: ['user', 'game']
      })

      const game = player.related('game') as Game

      player.ready()
      await player.save()

      const players = await game.players().fetch()
      const formattedPlayers = await formatPlayers(players)

      pubsub.publish(PLAYER.READY, {
        gameUpdated: {
          gameUUID: game.uuid,
          type: GameStatusType.Ready,
          players: formattedPlayers
        }
      })

      return true
    }
  }
}

export default resolvers
