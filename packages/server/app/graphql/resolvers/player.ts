import { Player } from '@la-ferme/shared/typings'
import User from '@/app/models/User'

const resolvers = {
  Query: {
    async getPlayer(_, { userUUID }): Promise<Player> {
      const user = await User.findByUUID(userUUID)
      const players = await user.players
      const player = await players.orderBy('id').fetch()
      const { character, skill, goal } = player.last().serialize()
      return {
        user: user.uuid,
        character,
        skill,
        goal
      }
    }
  }
}

export default resolvers
