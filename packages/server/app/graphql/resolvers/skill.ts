import { Collection } from 'bookshelf'
import { SKILL } from '@la-ferme/shared/constants'
import { EventType, UUID } from '@la-ferme/shared/typings'
import { SKILL_ALREADY_USED } from '@la-ferme/shared/errors'

import RoundTarget, { RoundTargetStatus } from '@/app/models/RoundTarget'
import Player from '@/app/models/Player'
import Skill from '@/app/models/Skill'
import Game from '@/app/models/Game'

import pubsub from '@/app/pubsub'

import getActionBySkill from '@/app/engine/getActionBySkill'
import getResponseBySkill from '@/app/engine/getResponseBySkill'

const createTargets = async (skill: Skill, targets: UUID[]) => {
  const instances = targets.map(async target => {
    const p = await Player.findByUUID(target)
    await skill.targets().attach(p.id)
  })
  return Promise.all(instances)
}

const EMITTED_SKILLS: string[] = ['happy', 'speaker', 'shepherds-stick']
const skillShouldEmit = (skill: string): boolean => {
  return EMITTED_SKILLS.includes(skill)
}

const resolvers = {
  UseSkill: {
    __resolveType({ name }) {
      switch (name) {
        case 'speaker':
        case 'shepherds-stick':
          return 'UseSkillWithTargets'
        case 'cellphone':
          return 'UseSkillWithTargetsData'
        default:
          return 'UseSkillDefault'
      }
    }
  },
  Query: {
    async getLastTargeter(_, { playerUUID }) {
      const player = await Player.findByUUID(playerUUID, {
        withRelated: [
          {
            targeted: qb => qb.where({ status: RoundTargetStatus.New }),
            'targeted.round': qb => qb.column('id', 'player_id', 'created_at')
          }
        ]
      })

      const target = player
        .related('targeted')
        .orderBy('round.created_at') as Collection<RoundTarget>
      const last = target.last()
      const round = await last.round().fetch({
        columns: ['id', 'player_id'],
        withRelated: [
          {
            player: qb => qb.column('id', 'uuid')
          }
        ]
      })
      const targeter = round.related('player') as Player

      return {
        targeter: targeter.uuid
      }
    }
  },
  Mutation: {
    async useSkill(_, { playerUUID, targets }) {
      const player = await Player.findByUUID(playerUUID, {
        withRelated: ['skill', 'game']
      })

      const skill = player.related('skill') as Skill
      const game = player.related('game') as Game

      if (!skill.usable) {
        throw new Error(SKILL_ALREADY_USED)
      }

      skill.use()
      await skill.save()

      const autoTargets = await getActionBySkill(skill)
      if (targets) await createTargets(skill, targets)

      if (skillShouldEmit(skill.name)) {
        pubsub.publish(SKILL.USE, {
          eventTriggered: {
            type: EventType.Skill,
            gameUUID: game.uuid,
            player: playerUUID,
            skill: skill.name,
            targets: [].concat(autoTargets || [], targets || [])
          }
        })
      }

      return await getResponseBySkill(skill)
    }
  }
}

export default resolvers
