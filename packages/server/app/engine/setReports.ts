import { Collection } from 'bookshelf'
import { ReportStatus } from '@la-ferme/shared/typings'
import {
  CONFIRM_REPORT,
  REVERSE_REPORT,
  MAX_ROUNDS_REPORT
} from '@la-ferme/shared/settings'

import Game from '@/app/models/Game'
import Player from '@/app/models/Player'
import Report from '@/app/models/Report'

export interface SetReportsOptions {
  player: Player
  delta: number
}

export default async (game: Game, { player, delta }: SetReportsOptions) => {
  try {
    const reportsQuery = game.reports().where(
      {
        status: ReportStatus.New,
        to_player_id: player.id
      },
      false
    ) as Collection<Report>
    const reports = await reportsQuery.fetch()

    const promises = reports.map(report => {
      report.increase(delta)
      report.completeRound()
      if (report.score < CONFIRM_REPORT) {
        console.log('CONFIRM REPORT', player.character, report.score)
        report.status = ReportStatus.Confirmed
      } else if (
        report.score > REVERSE_REPORT ||
        report.rounds > MAX_ROUNDS_REPORT
      ) {
        console.log('REVERSE REPORT', player.character, report.score)
        report.status = ReportStatus.Reversed
      } else {
        console.log('REPORT', player.character, report.score)
      }
      return report.save()
    })

    await Promise.all(promises)
  } catch (err) {
    return err
  }
}
