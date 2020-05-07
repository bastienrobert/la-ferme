import db from '@/config/database'

import Player from './Player'
import Connection from './Connection'

export default class User extends db.bookshelf.Model<User> {
  static async find(id, params?) {
    return await new User().where('id', id).fetch(params)
  }

  static async findByUUID(uuid, params?) {
    return await new User().where('uuid', uuid).fetch(params)
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

  players() {
    return this.hasMany(Player)
  }

  connections() {
    return this.hasMany(Connection)
  }

  async getLastPlayer(params?) {
    const player = await this.players()
      .orderBy('created_at', 'DESC')
      .fetchOne(params)
    return player
  }
}
