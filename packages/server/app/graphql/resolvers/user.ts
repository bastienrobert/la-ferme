import User from '@/app/models/User'

const resolvers = {
  Query: {
    async getUser(_, { uuid }) {
      try {
        if (!uuid) throw new Error('uuid is undefined')
        const user = await User.findByUUID(uuid)
        return {
          existed: true,
          uuid: user.uuid
        }
      } catch (error) {
        const user = await User.create()
        return {
          existed: false,
          uuid: user.uuid
        }
      }
    }
  }
}

export default resolvers
