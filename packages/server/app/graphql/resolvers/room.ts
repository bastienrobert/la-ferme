import { ROOM } from '@la-ferme/shared/constants'
import { UUID } from '@la-ferme/shared/typings'
import { withFilter } from 'apollo-server'

import pubsub from '@/app/pubsub'
import { connections } from '@/app/stores'
import formatConnectedUsers from '@/app/helpers/formatConnectedUsers'

const resolvers = {
  Query: {
    // get connected users
    connectedUsers(_, { boxID }) {
      return formatConnectedUsers(boxID, connections.getByBoxID(boxID))
    }
  },
  Mutation: {
    // join room
    joinRoom(_, { userUUID, boxID }): UUID {
      connections.setBoxID(userUUID, boxID)
      pubsub.publish(ROOM.JOIN, {
        connectedUsers: formatConnectedUsers(
          boxID,
          connections.getByBoxID(boxID)
        )
      })
      return boxID
    }
  },
  Subscription: {
    // stream user connections
    connectedUsers: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([ROOM.JOIN, ROOM.LEAVE]),
        ({ connectedUsers }, variables) => {
          return connectedUsers.boxId === variables.boxId
        }
      )
    }
  }
}

export default resolvers
