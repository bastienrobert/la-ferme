import { REPORT } from '@la-ferme/shared/constants'

import pubsub from '@/app/pubsub'

import User from '@/app/models/User'
import Report, { ReportStatus } from '@/app/models/Report'

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

      const existingReportsByFrom = await Report.where<Report>({
        from_player_id: fromPlayer.id
      }).fetch()

      // const [uncompletedReportsByFrom, existsWithTo] = await Promise.all([
      //   existingReportsByFrom
      //     .where({
      //       status: ReportStatus.NEW
      //     })
      //     .count(),
      //   existingReportsByFrom
      //     .where({
      //       to_player_id: toPlayer.id
      //     })
      //     .count()
      // ])

      // const reject = uncompletedReportsByFrom > 2 || existsWithTo > 2
      const count = await existingReportsByFrom.count()
      const reject = count > 0

      const report = new Report({
        from_player_id: fromPlayer.id,
        to_player_id: toPlayer.id,
        score: toPlayer.score <= 0 ? 1 : 0,
        status: reject ? ReportStatus.REJECTED : ReportStatus.NEW
      })
      report.save()

      // for each report, user score is dicreased
      // if (reject) {
      //   fromPlayer.decreaseScore()
      //   fromPlayer.save()
      // }

      if (!reject) {
        pubsub.publish(REPORT.CREATE, {
          playerIsReport: {
            boxID,
            fromPlayer,
            toPlayer
          }
        })

        return true
      }

      return false
    }
  }
}

export default resolvers
