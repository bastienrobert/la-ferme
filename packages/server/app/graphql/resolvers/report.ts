import User from '@/app/models/User'
import Report, { ReportStatus } from '@/app/models/Report'

import getPlayer from '@/app/helpers/getPlayer'

const resolvers = {
  Mutation: {
    async reportPlayer(_, { fromUUID, toUUID }) {
      const [from, to] = await Promise.all(
        [fromUUID, toUUID].map(userUUID =>
          User.findByUUID(userUUID, {
            withRelated: [{ players: qb => qb.orderBy('created_at') }]
          })
        )
      )

      const fromPlayer = getPlayer(from)
      const toPlayer = getPlayer(to)

      const countExistingReportsByFrom = await Report.where<Report>({
        from_player_id: fromPlayer.id
      }).count()

      const reject = countExistingReportsByFrom > 0

      const report = new Report({
        from_player_id: fromPlayer.id,
        to_player_id: toPlayer.id,
        score: toPlayer.score <= 0 ? 1 : 0,
        status: reject ? ReportStatus.REJECTED : ReportStatus.NEW
      })
      report.save()

      if (!reject) {
        return true
      }

      return false
    }
  }
}

export default resolvers
