import { SKILL } from '@la-ferme/shared/constants'
import { EventType } from '@la-ferme/shared/typings'
import { SKILL_ALREADY_USED } from '@la-ferme/shared/errors'

import Player from '@/app/models/Player'
import Skill from '@/app/models/Skill'
import Game from '@/app/models/Game'

import pubsub from '@/app/pubsub'

const getActionBySkillName = name => {
  switch (name) {
    case 'happy':
      console.log('HAPPY TRIGGERED')
      break
    default:
      break
  }
}

const resolvers = {
  Mutation: {
    async useSkill(_, { playerUUID }) {
      const player = await Player.findByUUID(playerUUID, {
        withRelated: ['skill', 'game']
      })

      const skill = player.related('skill') as Skill
      const game = player.related('game') as Game

      if (skill.used) {
        throw new Error(SKILL_ALREADY_USED)
      }

      getActionBySkillName(skill.name)

      skill.use()
      await skill.save()

      pubsub.publish(SKILL.USE, {
        eventTriggered: {
          type: EventType.Skill,
          gameUUID: game.uuid
        }
      })

      // TODO
      // create event for skill use

      return true
    }
  }
}

export default resolvers
