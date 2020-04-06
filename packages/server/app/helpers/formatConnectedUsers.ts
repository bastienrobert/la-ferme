import { UUID, User } from '@la-ferme/shared/typings'

import { ConnectionsCollection } from '@/app/stores/connections'

export interface FormattedConnectedUsers {
  boxID: UUID
  users: User[]
}

export default (
  boxID,
  users: ConnectionsCollection
): FormattedConnectedUsers => {
  return {
    boxID,
    users: [...users].map(([key]) => ({
      uuid: key
    }))
  }
}
