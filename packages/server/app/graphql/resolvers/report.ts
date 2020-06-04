import { TOO_MANY_REPORTS } from '@la-ferme/shared/errors'
import { ReportStatus } from '@la-ferme/shared/typings'

import Player from '@/app/models/Player'
import Game from '@/app/models/Game'
import Report from '@/app/models/Report'

const resolvers = {
  ReportStatus: {
    new: ReportStatus.New,
    confirmed: ReportStatus.Confirmed,
    duplicated: ReportStatus.Duplicated,
    reversed: ReportStatus.Reversed,
    completed: ReportStatus.Completed
  },
  Mutation: {
    async reportPlayer(_, { fromUUID, toUUID }) {
      const [from, to] = await Promise.all(
        [fromUUID, toUUID].map(uuid =>
          Player.findByUUID(uuid, {
            withRelated: ['game']
          })
        )
      )
      const game = from.related('game') as Game

      const [countExistingReportsByFrom, reportsToTo] = await Promise.all([
        Report.where<Report>({
          from_player_id: from.id
        }).count(),
        Report.where<Report>({
          status: ReportStatus.New,
          to_player_id: to.id
        }).fetch({ require: false })
      ])
      const countReportsToTo = reportsToTo ? await reportsToTo.count() : 0

      const reject = countExistingReportsByFrom > 0
      if (reject) throw new Error(TOO_MANY_REPORTS)

      // prettier-ignore
      const status = countReportsToTo > 0
        ? ReportStatus.Duplicated
        : ReportStatus.New

      // prettier-ignore
      const duplicate_id = status === ReportStatus.Duplicated
        ? reportsToTo.id
        : null

      const report = new Report({
        game_id: game.id,
        from_player_id: from.id,
        to_player_id: to.id,
        score: to.score <= 0 ? -1 : 1,
        duplicate_id,
        status
      })
      await report.save()

      return true
    }
  }
}

export default resolvers
