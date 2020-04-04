import { ROOM } from '@la-ferme/shared'
import { withFilter } from 'apollo-server'

import pubsub from '../../pubsub'
import { connections } from '@/app/stores'

const resolvers = {
  Mutation: {
    // join room
    joinRoom(_, { box_id, user_uuid }) {
      // should get user ID and room ID
      connections.setGame(user_uuid, box_id)
      const users = connections.getGames(box_id)
      const connectedUsers = Array.from(users.entries()).map(({ 1: key }) => ({
        user_uuid: key
      }))
      pubsub.publish(ROOM.JOIN, {
        connectedUsers: {
          box_id,
          connectedUsers
        }
      })
      return box_id
    }
  },
  Subscription: {
    connectedUsers: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([ROOM.JOIN, ROOM.LEAVE]),
        (payload, variables) => {
          return payload.connectedUsers.box_id === variables.box_id
        }
      )
    }
  }
}

export default resolvers
