import { REPORT } from '@la-ferme/shared/constants'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'

import Room from '@/app/models/Room'
import User from '@/app/models/User'

import getPlayer from '@/app/helpers/getPlayer'

const resolvers = {
  Mutation: {
    async reportPlayer(_, { boxID, fromUUID, toUUID }) {
      const room = await Room.findByBoxID(boxID, {
        withRelated: [{ games: qb => qb.orderBy('created_at') }]
      })

      const game = await room.getLastGame({ withRelated: ['players'] })
      const [from, to] = await Promise.all(
        [fromUUID, toUUID].map(userUUID =>
          User.findByUUID(userUUID, {
            withRelated: [{ players: qb => qb.orderBy('created_at') }]
          })
        )
      )

      const fromPlayer = getPlayer(from)
      const toPlayer = getPlayer(to)

      // record Report in DB with default Score

      console.log(game.players)

      pubsub.publish(REPORT.CREATE, {
        playerIsReport: {
          boxID,
          fromPlayer,
          toPlayer
        }
      })

      return true
    }
  },
  Subscription: {
    playerIsReport: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(REPORT.CREATE),
        ({ playerIsReport }, variables) => {
          return (
            playerIsReport.boxID === variables.boxID &&
            playerIsReport.fromPlayer === variables.userUUID
          )
        }
      )
    }
  }
}

export default resolvers
