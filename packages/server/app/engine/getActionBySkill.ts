import { Collection } from 'bookshelf'
import { SKILL_UNAVAILABLE } from '@la-ferme/shared/errors'
import { UUID } from '@la-ferme/shared/typings'

import Skill from '@/app/models/Skill'
import Player from '@/app/models/Player'
import RoundTarget, { RoundTargetStatus } from '@/app/models/RoundTarget'

import checkUnwatch from './checkUnwatch'

const editLastRoundTarget = async (skill: Skill) => {
  // get player with related targets and rounds
  const player = await skill.player().fetch({
    withRelated: [
      {
        targeted: qb => qb.where({ status: RoundTargetStatus.New }),
        'targeted.round': qb => qb.column('id', 'player_id', 'created_at')
      }
    ]
  })

  // get last target
  const target = player
    .related('targeted')
    .orderBy('round.created_at') as Collection<RoundTarget>
  const last = target.last()

  // if player is not targeted, reject skill use
  if (!last) {
    skill.reset()
    skill.save()
    throw new Error(SKILL_UNAVAILABLE)
  }

  // assign a new state to the target
  last.status =
    skill.name === 'shepherds-stick'
      ? RoundTargetStatus.Reversed
      : RoundTargetStatus.Canceled

  // check if round should watch or not
  const round = await last.round().fetch({ withRelated: ['player'] })
  await checkUnwatch(round)

  await skill.complete().save()
  await last.save()

  const targeter = round.related('player') as Player
  return [targeter.uuid]
}

/**
 * should return automatic targets
 */
export default async (skill: Skill): Promise<UUID[]> => {
  switch (skill.name) {
    case 'speaker':
    case 'shepherds-stick':
      return await editLastRoundTarget(skill)
    case 'cellphone':
      await skill.complete().save()
      return []
    default:
      return
  }
}
