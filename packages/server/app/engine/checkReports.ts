import { Collection } from 'bookshelf'

import { REPORT } from '@la-ferme/shared/constants'
import { EventType, ReportStatus } from '@la-ferme/shared/typings'

import Report from '@/app/models/Report'
import Player from '@/app/models/Player'
import Game from '@/app/models/Game'

import pubsub from '@/app/pubsub'

export default async (game: Game) => {
  const reportQuery = game.reports().query({
    where: { status: ReportStatus.Confirmed },
    orWhere: { status: ReportStatus.Reversed }
  }) as Collection<Report>
  const reports = await reportQuery.fetch({
    withRelated: ['from', 'to', 'duplications']
  })

  const report = reports.first()

  if (report) {
    const reversed = report.status === ReportStatus.Reversed
    const player = (reversed
      ? report.related('from')
      : report.related('to')) as Player

    if (reversed) {
      const duplications = report.related('duplications') as Collection<Report>
      // should publish in pubsub all other players
      console.log(duplications.serialize())
    }

    pubsub.publish(REPORT.CREATE, {
      eventTriggered: {
        gameUUID: game.uuid,
        status: report.status,
        type: EventType.Report,
        player: player.uuid
      }
    })

    report.status = ReportStatus.Completed
    await report.save()
  }
}
