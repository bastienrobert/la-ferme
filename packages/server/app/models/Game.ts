import db from '@/config/database'

import Room from './Room'
import Round from './Round'
import User from './User'
import Player from './Player'

export default class Game extends db.bookshelf.Model<Game> {
  static async find(id) {
    return await new Game().where('id', id).fetch()
  }

  get tableName() {
    return 'games'
  }

  get hasTimestamps() {
    return true
  }

  get room() {
    return this.belongsTo(Room)
  }

  get rounds() {
    return this.hasMany(Round)
  }

  get creator() {
    return this.hasOne(User, 'id', 'creator_id')
  }

  get players() {
    return this.hasMany(Player)
  }

  get started() {
    return this.get('started_at')
  }

  set winner(value: string) {
    // should take a player in params
    // should check player is in the game
    this.set({ winner_id: value })
  }

  start() {
    this.set({ started_at: new Date(Date.now()) })
    return this
  }
}
