import { Collection } from 'bookshelf'

import { REPORT } from '@la-ferme/shared/constants'
import { UUID, EventType, ReportStatus } from '@la-ferme/shared/typings'

import Report from '@/app/models/Report'
import Player from '@/app/models/Player'
import Game from '@/app/models/Game'

import pubsub from '@/app/pubsub'

const publishReports = (gameUUID: UUID, { report, targets }) => {
  pubsub.publish(REPORT.CREATE, {
    eventTriggered: {
      gameUUID: gameUUID,
      status: report.status,
      type: EventType.Report,
      targets
    }
  })
}

export default async (game: Game) => {
  const reportQuery = game.reports().query({
    where: { status: ReportStatus.Confirmed },
    orWhere: { status: ReportStatus.Reversed }
  }) as Collection<Report>
  const reports = await reportQuery.fetch({
    withRelated: ['from', 'to', 'duplications', 'duplications.from']
  })

  const report = reports.first()

  if (report) {
    const reversed = report.status === ReportStatus.Reversed
    const player = (reversed
      ? report.related('from')
      : report.related('to')) as Player

    if (reversed) {
      const duplications = report.related('duplications') as Collection<Report>

      const duplicationsPlayers = duplications.map(duplication => {
        const p = duplication.related('from') as Player
        return p.uuid
      })

      publishReports(game.uuid, {
        report,
        targets: [player.uuid, ...duplicationsPlayers]
      })
    } else {
      publishReports(game.uuid, { report, targets: [player.uuid] })
    }

    report.status = ReportStatus.Completed
    await report.save()
  }
}
