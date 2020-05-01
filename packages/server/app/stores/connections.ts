import { UUID } from '@la-ferme/shared/typings'
import Emitter from '@bastienrobert/events'
import merge from 'lodash.merge'

import ConnectionModel from '@/app/models/Connection'
import UserModel from '@/app/models/User'

export interface Connection {
  boxID: UUID | null
  ready: boolean
}

export type ConnectionsCollection = Map<UUID, Connection>

const DEFAULT_VALUE = {
  boxID: null,
  ready: false
}

class Connections extends Emitter {
  _connections: ConnectionsCollection = new Map()

  protected static async saveDisconnect(user: UserModel) {
    const connection = await user.connections().fetch()
    connection
      .orderBy('created_at', 'DESC')
      .query(qb => qb.limit(1))
      .first()
      .disconnect()
      .save()
  }

  protected static async surrenderPlayer(user: UserModel) {
    const player = await user
      .players()
      .orderBy('created_at', 'DESC')
      .query(qb => qb.limit(1))
      .fetch()
    const last = player.first()
    if (!last) return false
    await last.surrender().save()
    return true
  }

  async connect(key: UUID) {
    const user = await UserModel.findByUUID(key)
    new ConnectionModel({ user_id: user.id }).save()
    const res = this.reset(key)
    this.emit('connect', key, this.get(key))
    return res
  }

  get(key: UUID) {
    return this._connections.get(key)
  }

  set(key: UUID, value: Connection) {
    return this._connections.set(key, value)
  }

  reset(key: UUID) {
    return this._connections.set(key, { ...DEFAULT_VALUE })
  }

  merge(userUUID, newState) {
    const state = this._connections.get(userUUID)
    return this._connections.set(userUUID, merge(state, newState))
  }

  setBoxID(userUUID: UUID, boxID: UUID) {
    return this.merge(userUUID, { boxID })
  }

  setReady(userUUID: UUID) {
    return this.merge(userUUID, { ready: true })
  }

  getByBoxID(id: UUID) {
    return new Map([...this._connections].filter(({ 1: v }) => v.boxID === id))
  }

  async disconnect(key: UUID) {
    const value = this.get(key)
    if (!value) return
    this.emit('disconnecting', key, value)
    const user = await UserModel.findByUUID(key)
    await Promise.all([
      Connections.saveDisconnect(user),
      Connections.surrenderPlayer(user)
    ])
    const res = this._connections.delete(key)
    this.emit('disconnect', key)
    return res
  }
}

export default new Connections()
