import db from '@/config/database'

import Room from './Room'
import Round from './Round'
import User from './User'
import Player from './Player'

export default class Game extends db.bookshelf.Model<Game> {
  static async find(id, params?) {
    return await new Game().where('id', id).fetch(params)
  }

  get tableName() {
    return 'games'
  }

  get hasTimestamps() {
    return true
  }

  room() {
    return this.belongsTo(Room)
  }

  rounds() {
    return this.hasMany(Round)
  }

  creator() {
    return this.hasOne(User, 'id', 'creator_id')
  }

  players() {
    return this.hasMany(Player)
  }

  start() {
    this.set({ started_at: new Date(Date.now()) })
  }

  get started_at() {
    return this.get('started_at')
  }

  set winner(value: number) {
    // should take a player in params
    // should check player is in the game
    this.set({ winner_id: value })
  }
}
