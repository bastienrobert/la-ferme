import { Collection } from 'bookshelf'
import { SKILL_UNAVAILABLE } from '@la-ferme/shared/errors'

import Skill from '@/app/models/Skill'
import RoundTarget, { RoundTargetStatus } from '@/app/models/RoundTarget'

import checkUnwatch from './checkUnwatch'

const editLastRoundTarget = async (skill: Skill) => {
  // get player with related targets and rounds
  const player = await skill.player().fetch({
    withRelated: [
      {
        targetted: qb => qb.where({ status: RoundTargetStatus.New })
      },
      'targetted.round'
    ]
  })

  // get last target
  const target = player
    .related('targetted')
    .orderBy('round.created_at') as Collection<RoundTarget>
  const last = target.last()

  // if player is not targetted, reject skill use
  if (!last) throw new Error(SKILL_UNAVAILABLE)

  // assign a new state to the target
  last.status =
    skill.name === 'shepherds-stick'
      ? RoundTargetStatus.Reversed
      : RoundTargetStatus.Canceled

  // check if round should watch or not
  const round = await last.round().fetch()
  await checkUnwatch(round)

  return last.save()
}

export default async (skill: Skill) => {
  switch (skill.name) {
    case 'happy':
      skill.use()
      return await skill.save()
    case 'speaker':
    case 'shepherds-stick':
      return await editLastRoundTarget(skill)
    default:
      return
  }
}
