import { UUID } from '@la-ferme/shared/typings'
import Emitter from '@bastienrobert/events'
import merge from 'lodash.merge'

import ConnectionModel from '@/app/models/Connection'
import UserModel from '@/app/models/User'

import getPlayer from '@/app/helpers/getPlayer'

export interface Connection {
  boxID: UUID | null
  gameUUID: UUID | null
  playerUUID: UUID | null
  ready: boolean
}

export type ConnectionsCollection = Map<UUID, Connection>

const DEFAULT_VALUE = {
  boxID: null,
  gameUUID: null,
  playerUUID: null,
  ready: false
}

class Connections extends Emitter {
  _connections: ConnectionsCollection = new Map()

  protected static async saveDisconnect(user: UserModel) {
    const connections = await user
      .connections()
      .orderBy('connected_at', 'DESC')
      .fetchOne()
    connections.disconnect().save()
  }

  protected static async surrenderPlayer(user: UserModel) {
    const player = getPlayer(user)
    if (!player) return false
    await player.surrender().save()
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
    const user = await UserModel.findByUUID(key, {
      withRelated: [{ players: qb => qb.orderBy('created_at') }]
    })
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
