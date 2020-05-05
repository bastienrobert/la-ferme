import { SKILL } from '@la-ferme/shared/constants'
import { EventType } from '@la-ferme/shared/typings'

import Room from '@/app/models/Room'
import User from '@/app/models/User'

import pubsub from '@/app/pubsub'

import getPlayer from '@/app/helpers/getPlayer'

const resolvers = {
  Mutation: {
    async useSkill(_, { userUUID }) {
      const user = await User.findByUUID(userUUID, {
        withRelated: [{ players: qb => qb.orderBy('created_at') }]
      })

      const player = getPlayer(user)
      const [skill, game] = await Promise.all([
        player.skill().fetch(),
        player.game().fetch({
          withRelated: ['room']
        })
      ])
      skill.used()
      await skill.save()

      const room = game.related('room') as Room
      const boxID = room.boxID

      pubsub.publish(SKILL.USE, {
        eventTriggered: {
          type: EventType.Skill,
          boxID
        }
      })

      // TODO
      // create event for skill use

      return true
    }
  }
}

export default resolvers
