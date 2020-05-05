import { TOO_MANY_REPORTS, ALREADY_REPORT } from '@la-ferme/shared/errors'

import User from '@/app/models/User'
import Game from '@/app/models/Game'
import Report, { ReportStatus } from '@/app/models/Report'

import getPlayer from '@/app/helpers/getPlayer'

const resolvers = {
  Mutation: {
    async reportPlayer(_, { fromUUID, toUUID }) {
      const [from, to] = await Promise.all(
        [fromUUID, toUUID].map(userUUID =>
          User.findByUUID(userUUID, {
            withRelated: [
              { players: qb => qb.orderBy('created_at') },
              'players.game'
            ]
          })
        )
      )

      const fromPlayer = getPlayer(from)
      const toPlayer = getPlayer(to)
      const game = fromPlayer.related('game') as Game

      const [
        countExistingReportsByFrom,
        countExistingReportsToTo
      ] = await Promise.all([
        Report.where<Report>({
          from_player_id: fromPlayer.id
        }).count(),
        Report.where<Report>({
          to_player_id: toPlayer.id
        }).count()
      ])

      const rejectForFrom = countExistingReportsByFrom > 0
      const rejectForTo = countExistingReportsToTo > 0
      const reject = rejectForFrom || rejectForTo

      const report = new Report({
        game_id: game.id,
        from_player_id: fromPlayer.id,
        to_player_id: toPlayer.id,
        score: toPlayer.score <= 0 ? -1 : 1,
        status: reject ? ReportStatus.Rejected : ReportStatus.New
      })
      report.save()

      if (rejectForFrom) throw new Error(TOO_MANY_REPORTS)
      if (rejectForTo) throw new Error(ALREADY_REPORT)

      return true
    }
  }
}

export default resolvers
