import { ROOM } from '@la-ferme/shared/constants'
import { UUID } from '@la-ferme/shared/typings'

import pubsub from './pubsub'
import { connections } from '@/app/stores'
import formatConnectedUsers from '@/app/helpers/formatConnectedUsers'

export interface ConnectionParams {
  user: UUID
}

export interface InitialContext {
  user: UUID
}

export default {
  onConnect: (connectionParams: ConnectionParams): InitialContext => {
    const user = connectionParams.user

    console.log('HELLO', user)
    connections.connect(user)

    return { user }
  },
  onDisconnect: async (_, context): Promise<void> => {
    const initialContext: InitialContext = await context.initPromise
    const user = initialContext.user

    const connection = connections.get(user)
    const boxID = connection ? connection.boxID : null

    console.log('BYE', user, 'connected to', boxID)

    connections.disconnect(user)

    if (boxID) {
      pubsub.publish(ROOM.LEAVE, {
        connectedUsers: formatConnectedUsers(
          boxID,
          connections.getByBoxID(boxID)
        )
      })
    }

    return
  }
}
