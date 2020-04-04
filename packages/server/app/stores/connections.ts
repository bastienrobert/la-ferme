import Emitter from '@bastienrobert/events'
import merge from 'lodash.merge'

class Connections extends Emitter {
  _connections = new Map()

  connect(key) {
    const res = this.set(key, {
      game: null
    })
    this.emit('connect', key, this.get(key))
    return res
  }

  get(key) {
    return this._connections.get(key)
  }

  set(key, value) {
    return this._connections.set(key, value)
  }

  setGame(user_id, game_id) {
    const state = this._connections.get(user_id)
    return this._connections.set(
      user_id,
      merge(state, {
        game: game_id
      })
    )
  }

  getGames(id) {
    const res = new Map()
    this._connections.forEach((val, key) => {
      if (val.game === id) res.set(val, key)
    })
    return res
  }

  disconnect(key) {
    this.emit('disconnecting', key, this.get(key))
    const res = this._connections.delete(key)
    this.emit('disconnect', key)
    return res
  }
}

export default new Connections()
