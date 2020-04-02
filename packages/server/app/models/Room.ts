import db from '@/config/database'

import Game from './Game'

export default class Room extends db.bookshelf.Model<Room> {
  static async all() {
    const all = await Room.fetchAll()
    return all.serialize()
  }

  get tableName() {
    return 'rooms'
  }

  get games() {
    return this.hasMany(Game)
  }

  get hasTimestamps() {
    return true
  }
}
