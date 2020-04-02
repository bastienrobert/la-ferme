import { ROUND } from '@la-ferme/shared'
import { withFilter } from 'apollo-server'

import pubsub from '../pubsub'

import Room from '@/app/models/Room'

const resolvers = {
  Query: {
    // returns all rooms
    rooms: async () => await Room.all()
  },
  Mutation: {
    // join room
    join() {
      // should get user ID and room ID
      const id = Math.random()
      pubsub.publish('NEW_USER_CONNECTION', {
        connection: id
      })
      return new Promise(resolve => resolve(id))
    },
    // round complete
    roundComplete() {
      const id = Math.random()
      pubsub.publish(ROUND.COMPLETED, {
        roundCompleted: id
      })
      return new Promise(resolve => resolve(id))
    }
  },
  Subscription: {
    connection: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(['NEW_USER_CONNECTION']),
        (payload, args, rest) => {
          console.log(payload, args, rest)
          return true
        }
      )
    },
    // tell to connected client when a round is complete
    roundCompleted: {
      subscribe: () => pubsub.asyncIterator([ROUND.COMPLETED])
    }
  }
}

export default resolvers
