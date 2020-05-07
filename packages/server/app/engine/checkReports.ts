import { Collection } from 'bookshelf'

import { REPORT } from '@la-ferme/shared/constants'
import { UUID, EventType } from '@la-ferme/shared/typings'

import Report, { ReportStatus } from '@/app/models/Report'
import Player from '@/app/models/Player'
import Game from '@/app/models/Game'

import pubsub from '@/app/pubsub'

export interface CheckReportsOptions {
  game: Game
}

export default async (gameUUID: UUID, { game }: CheckReportsOptions) => {
  const reportQuery = game
    .reports()
    .where({ status: ReportStatus.Confirmed }, false) as Collection<Report>
  const reports = await reportQuery.fetch({
    withRelated: ['to']
  })

  const report = reports.last()

  if (report) {
    const player = report.related('to') as Player

    report.status = ReportStatus.Completed
    await report.save()

    pubsub.publish(REPORT.CREATE, {
      eventTriggered: {
        gameUUID,
        type: EventType.Report,
        player: player.uuid
      }
    })
  }
}
