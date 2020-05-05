import { PLAYER } from '@la-ferme/shared/constants'
import { Player, GameStatusType } from '@la-ferme/shared/typings'

import pubsub from '@/app/pubsub'

import Room from '@/app/models/Room'
import User from '@/app/models/User'

import formatPlayers, { formatPlayer } from '@/app/helpers/formatPlayers'
import getPlayer from '@/app/helpers/getPlayer'

const resolvers = {
  Query: {
    async getPlayer(_, { userUUID }): Promise<Player> {
      const user = await User.findByUUID(userUUID, {
        withRelated: ['players', 'players.user']
      })

      const player = getPlayer(user)
      const formattedPlayer = await formatPlayer(player)
      return formattedPlayer
    }
  },
  Mutation: {
    async playerReady(_, { boxID, userUUID }) {
      const user = await User.findByUUID(userUUID, {
        withRelated: [
          { players: qb => qb.orderBy('created_at') },
          'players.user'
        ]
      })
      const player = getPlayer(user)
      player.ready()
      await player.save()

      const room = await Room.findByBoxID(boxID, {
        withRelated: [{ games: qb => qb.orderBy('created_at') }]
      })

      const game = await room.getLastGame({
        withRelated: ['players', 'players.user']
      })

      const players = game.related('players')
      const formattedPlayers = await formatPlayers(players)

      pubsub.publish(PLAYER.READY, {
        gameUpdated: {
          type: GameStatusType.Ready,
          boxID,
          players: formattedPlayers
        }
      })

      return true
    }
  }
}

export default resolvers
