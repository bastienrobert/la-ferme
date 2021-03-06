import { ROOM } from '@la-ferme/shared/constants'
import { MAX_PLAYERS } from '@la-ferme/shared/settings'
import { MAX_PLAYERS_REACHED, GAME_STARTED } from '@la-ferme/shared/errors'
import { withFilter } from 'apollo-server'

import Room from '@/app/models/Room'
import Game from '@/app/models/Game'
import User from '@/app/models/User'
import Player from '@/app/models/Player'

import pubsub from '@/app/pubsub'
import connections, { ConnectionsCollection } from '@/app/stores/connections'
import formatConnectedUsers from '@/app/helpers/formatConnectedUsers'

const getGame = async (
  room: Room,
  user: User,
  users: ConnectionsCollection
) => {
  return users.size > 0
    ? await room.getLastGame()
    : await new Game({
        room_id: room.id,
        creator_user_id: user.id
      }).save()
}

const createOrJoin = async (userUUID, boxID) => {
  const user = await User.findByUUID(userUUID)
  const connectedUsers = connections.getByBoxID(boxID)
  if (connectedUsers.size > MAX_PLAYERS) throw new Error(MAX_PLAYERS_REACHED)

  const room = await Room.findByBoxID(boxID)
  const game = await getGame(room, user, connectedUsers)

  if (game.startedAt) throw new Error(GAME_STARTED)

  const player = await new Player({
    game_id: game.id,
    user_id: user.id
  }).save()

  const creator = await game.creator().fetch()

  return {
    playerUUID: player.uuid,
    gameUUID: game.uuid,
    creatorUUID: creator.uuid
  }
}

const resolvers = {
  Mutation: {
    // join room
    async joinRoom(_, { userUUID, boxID }) {
      try {
        const { playerUUID, gameUUID, creatorUUID } = await createOrJoin(
          userUUID,
          boxID
        )
        connections.merge(userUUID, {
          boxID,
          playerUUID,
          gameUUID
        })
        const connectedUsers = {
          boxID,
          creatorUUID,
          gameUUID,
          playerUUID,
          ...formatConnectedUsers(boxID, connections.getByBoxID(boxID))
        }
        pubsub.publish(ROOM.JOIN, {
          connectedUsers
        })
        return connectedUsers
      } catch (error) {
        console.log(error)
        return error
      }
    }
  },
  Subscription: {
    // stream user connections
    connectedUsers: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([ROOM.JOIN, ROOM.LEAVE]),
        ({ connectedUsers }, variables) => {
          return connectedUsers.boxID === variables.boxID
        }
      )
    }
  }
}

export default resolvers
