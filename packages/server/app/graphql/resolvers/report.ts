import { REPORT } from '@la-ferme/shared/constants'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'

import User from '@/app/models/User'
import Report from '@/app/models/Report'

import getPlayer from '@/app/helpers/getPlayer'

const resolvers = {
  Mutation: {
    async reportPlayer(_, { boxID, fromUUID, toUUID }) {
      const [from, to] = await Promise.all(
        [fromUUID, toUUID].map(userUUID =>
          User.findByUUID(userUUID, {
            withRelated: [{ players: qb => qb.orderBy('created_at') }]
          })
        )
      )

      const fromPlayer = getPlayer(from)
      const toPlayer = getPlayer(to)

      const report = new Report({
        from_player_id: fromPlayer.id,
        to_player_id: toPlayer.id,
        score: 0 // TODO: set default score to 1 or -1 if user civil cards > or < to uncivil cards
      })
      report.save()

      console.log(
        'NEW REPORT == FROM',
        fromPlayer.character,
        'TO',
        toPlayer.character
      )

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
