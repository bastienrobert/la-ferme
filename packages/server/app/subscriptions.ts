import { ROOM } from '@la-ferme/shared'

import { connections } from '@/app/stores'
import pubsub from './pubsub'

export default {
  onConnect: connectionParams => {
    const user = connectionParams.user

    console.log('HELLO', user)
    connections.connect(user)

    return { user }
  },
  onDisconnect: async (_, context) => {
    const initialContext = await context.initPromise
    const user = initialContext.user

    const connection = connections.get(user)
    const game = connection ? connection.game : null
    console.log('BYE', user, 'connected to', game)

    connections.disconnect(user)
    if (connection) {
      const users = connections.getGames(connection.game)
      const connectedUsers = Array.from(users.entries()).map(({ 1: key }) => ({
        user_uuid: key
      }))
      pubsub.publish(ROOM.LEAVE, {
        connectedUsers: {
          box_id: connection.game,
          connectedUsers
        }
      })
    }

    return true
  }
}
