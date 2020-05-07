import { Collection } from 'bookshelf'
import { REPORT } from '@la-ferme/shared/constants'
import { EventType } from '@la-ferme/shared/typings'

import Game from '@/app/models/Game'
import Player from '@/app/models/Player'
import Report, { ReportStatus } from '@/app/models/Report'

import pubsub from '@/app/pubsub'

export interface ReportsOptions {
  game: Game
  player: Player
  delta: number
}

export default async (gameUUID, { game, player, delta }: ReportsOptions) => {
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
      if (report.score < -2) {
        report.status = ReportStatus.Completed

        console.log('PASSED IN REPORT SCORE')

        pubsub.publish(REPORT.CREATE, {
          eventTriggered: {
            gameUUID,
            type: EventType.Report,
            player: player.uuid
          }
        })
      }
      if (report.score > 1) report.status = ReportStatus.Canceled
      await report.save()
    }

    console.log('REPORT', report.score)
  } catch (err) {
    return
  }
}
