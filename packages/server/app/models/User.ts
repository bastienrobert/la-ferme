import db from '@/config/database'

import Player from './Player'
import Connection from './Connection'

export default class User extends db.bookshelf.Model<User> {
  static async find(id) {
    return await new User().where('id', id).fetch()
  }

  static async findByUUID(uuid) {
    return await new User().where('uuid', uuid).fetch()
  }

  get tableName() {
    return 'users'
  }

  get hasTimestamps() {
    return true
  }

  get uuid() {
    return this.get('uuid')
  }

  get players() {
    return this.hasMany(Player)
  }

  get connections() {
    return this.hasMany(Connection)
  }
}
