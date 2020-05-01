import { PLAYER } from '@la-ferme/shared/constants'
import { Player } from '@la-ferme/shared/typings'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'

import Room from '@/app/models/Room'
import User from '@/app/models/User'

import formatPlayers from '@/app/helpers/formatPlayers'
import getPlayer from '@/app/helpers/getPlayer'

const resolvers = {
  Query: {
    async getPlayer(_, { userUUID }): Promise<Player> {
      const user = await User.findByUUID(userUUID, { withRelated: ['players'] })

      const player = getPlayer(user)
      const { character, skill, goal } = player.serialize()
      return {
        user: user.uuid,
        character,
        skill,
        goal
      }
    }
  },
  Mutation: {
    async playerReady(_, { boxID, userUUID }) {
      const user = await User.findByUUID(userUUID, {
        withRelated: [{ players: qb => qb.orderBy('created_at') }]
      })
      const player = getPlayer(user)
      player.ready()
      await player.save()

      const room = await Room.findByBoxID(boxID, {
        withRelated: [{ games: qb => qb.orderBy('created_at') }]
      })

      const game = await room.getLastGame({ withRelated: ['players'] })

      const players = game.related('players')
      const formattedPlayers = await formatPlayers(players)

      pubsub.publish(PLAYER.READY, {
        playerIsReady: {
          boxID,
          players: formattedPlayers
        }
      })

      return true
    }
  },
  Subscription: {
    playerIsReady: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(PLAYER.READY),
        ({ playerIsReady }, variables) => {
          return playerIsReady.boxID === variables.boxID
        }
      )
    }
  }
}

export default resolvers
