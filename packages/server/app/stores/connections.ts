import Emitter from '@bastienrobert/events'
import merge from 'lodash.merge'

import { UUID } from '@la-ferme/shared/typings'

export interface Connection {
  boxID: UUID | null
}

export type ConnectionsCollection = Map<UUID, Connection>

class Connections extends Emitter {
  _connections: ConnectionsCollection = new Map()

  connect(key: UUID) {
    const res = this.set(key, {
      boxID: null
    })
    this.emit('connect', key, this.get(key))
    return res
  }

  get(key: UUID) {
    return this._connections.get(key)
  }

  set(key: UUID, value: Connection) {
    return this._connections.set(key, value)
  }

  setBoxID(userUUID: UUID, boxID: UUID) {
    const state = this._connections.get(userUUID)
    return this._connections.set(
      userUUID,
      merge(state, {
        boxID: boxID
      })
    )
  }

  getByBoxID(id: UUID) {
    return new Map([...this._connections].filter(({ 1: v }) => v.boxID === id))
  }

  disconnect(key: UUID) {
    this.emit('disconnecting', key, this.get(key))
    const res = this._connections.delete(key)
    this.emit('disconnect', key)
    return res
  }
}

export default new Connections()
