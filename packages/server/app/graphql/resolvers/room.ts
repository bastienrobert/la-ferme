import { PubSub } from 'apollo-server'
import { Round } from '@la-ferme/shared'

const pubsub = new PubSub()

import Room from '@/app/models/Room'

const resolvers = {
  Query: {
    // returns all rooms
    rooms: async () => await Room.all
  },
  Mutation: {
    // create new room
    join() {
      return true
    },
    // round complete
    roundComplete() {
      const id = Math.random()
      pubsub.publish(Round.Completed, {
        roundCompleted: id
      })
      return new Promise(resolve => resolve(id))
    }
  },
  Subscription: {
    // tell to connected client when a round is complete
    roundCompleted: {
      subscribe: () => pubsub.asyncIterator([Round.Completed])
    }
  }
}

export default resolvers
