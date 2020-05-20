import { SKILL } from '@la-ferme/shared/constants'
import { EventType, UUID } from '@la-ferme/shared/typings'
import { SKILL_ALREADY_USED } from '@la-ferme/shared/errors'

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

// TODO
// Query to get informations about skill target
// => check if usable
// => skills
//   -> cellphone: return player list
//   -> happy: return true
//   -> speaker & shepherds-stick: get last targetted->rounds->player

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
  Mutation: {
    async useSkill(_, { playerUUID, targets }) {
      const player = await Player.findByUUID(playerUUID, {
        withRelated: ['skill', 'game']
      })

      const skill = player.related('skill') as Skill
      const game = player.related('game') as Game

      if (skill.used || skill.using) {
        throw new Error(SKILL_ALREADY_USED)
      }

      skill.use()
      await skill.save()

      await getActionBySkill(skill)
      if (targets) await createTargets(skill, targets)

      pubsub.publish(SKILL.USE, {
        eventTriggered: {
          type: EventType.Skill,
          gameUUID: game.uuid
        }
      })

      return await getResponseBySkill(skill)
    }
  }
}

export default resolvers
