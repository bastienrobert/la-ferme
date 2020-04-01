import db from '@/config/database'

export default class Room extends db.bookshelf.Model<Room> {
  static tableName = 'rooms'

  static get all() {
    return db.knex.select('id').from(Room.tableName)
  }

  get tableName() {
    return Room.tableName
  }

  get hasTimestamps() {
    return true
  }
}
