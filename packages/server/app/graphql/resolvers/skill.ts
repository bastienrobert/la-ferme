import User from '@/app/models/User'

import getPlayer from '@/app/helpers/getPlayer'

const resolvers = {
  Mutation: {
    async useSkill(_, { userUUID }) {
      const user = await User.findByUUID(userUUID, {
        withRelated: [{ players: qb => qb.orderBy('created_at') }]
      })

      const player = getPlayer(user)
      const skill = await player.skill().fetch()
      skill.used()
      await skill.save()

      // TODO
      // create event for skill use

      return true
    }
  }
}

export default resolvers
