import { User as UserType } from '@la-ferme/shared/typings'

import User from '@/app/models/User'

const resolvers = {
  Query: {
    async getUser(_, { uuid }): Promise<UserType> {
      try {
        if (!uuid) throw new Error('uuid is undefined')
        const user = await User.findByUUID(uuid)
        return {
          exists: true,
          uuid: user.uuid
        }
      } catch (error) {
        const user = await User.create()
        return {
          exists: false,
          uuid: user.uuid
        }
      }
    }
  }
}

export default resolvers
