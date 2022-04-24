import Round from '@/app/models/Round'
import { RoundTargetStatus } from '@/app/models/RoundTarget'

export default async (round: Round) => {
  // fetch targets for a round
  const targets = await round.targets().fetch()

  // check if round targets are all completed or cancel
  if (
    targets.every(t => {
      return (
        t.status === RoundTargetStatus.Completed ||
        t.status === RoundTargetStatus.Canceled
      )
    })
  ) {
    round.watch = false
    await round.save()
  }

  return
}
