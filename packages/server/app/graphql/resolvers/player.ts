import { PLAYER } from '@la-ferme/shared/constants'
import { Player } from '@la-ferme/shared/typings'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'

import Room from '@/app/models/Room'
import User from '@/app/models/User'

import formatPlayers from '@/app/helpers/formatPlayers'

const getPlayer = async user => {
  const players = await user.players
  const player = await players.orderBy('id').fetch()
  return player.last()
}

const resolvers = {
  Query: {
    async getPlayer(_, { userUUID }): Promise<Player> {
      const user = await User.findByUUID(userUUID)
      const player = await getPlayer(user)
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
      const user = await User.findByUUID(userUUID)
      const player = await getPlayer(user)
      player.ready()
      await player.save()

      const room = await Room.findByBoxID(boxID)
      const game = await (await room.getLastGame()).fetch()

      const players = await game.players.fetch()
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
