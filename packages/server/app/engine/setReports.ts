import { Collection } from 'bookshelf'

import Game from '@/app/models/Game'
import Player from '@/app/models/Player'
import Report, { ReportStatus } from '@/app/models/Report'

export interface ReportsOptions {
  game: Game
  player: Player
  delta: number
}

export default async ({ game, player, delta }: ReportsOptions) => {
  try {
    const reportQuery = game
      .reports()
      .where(
        { status: ReportStatus.New, to_player_id: player.id },
        false
      ) as Collection<Report>
    const report = await reportQuery.fetchOne()

    if (report) {
      report.increase(delta)
      if (report.score < -2) report.status = ReportStatus.Confirmed
      if (report.score > 1) report.status = ReportStatus.Canceled
      await report.save()
    }

    console.log('REPORT', player.character, report.score)
  } catch (err) {
    return
  }
}
