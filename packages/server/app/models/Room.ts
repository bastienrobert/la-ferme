import db from '@/config/database'

export default class Room extends db.bookshelf.Model<Room> {
  static async all() {
    const all = await Room.fetchAll()
    return all.serialize()
  }

  get tableName() {
    return 'rooms'
  }

  get games() {
    // @ts-ignore
    return this.hasMany('Game')
  }

  get hasTimestamps() {
    return true
  }
}
