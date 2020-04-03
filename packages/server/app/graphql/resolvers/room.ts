import { ROOM } from '@la-ferme/shared'
import { withFilter } from 'apollo-server'

import pubsub from '../pubsub'

const resolvers = {
  Mutation: {
    // join room
    joinRoom() {
      // should get user ID and room ID
      pubsub.publish(ROOM.JOIN, {
        userJoinRoom: 1
      })
      return true
    }
  },
  Subscription: {
    userJoinRoom: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([ROOM.JOIN]),
        (payload, variables) => {
          return payload.userJoinRoom === variables.room
        }
      )
    }
  }
}

export default resolvers
