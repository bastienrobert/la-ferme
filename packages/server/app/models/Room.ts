import db from '@/config/database'

import Game from './Game'

export default class Room extends db.bookshelf.Model<Room> {
  static async findByBoxID(id) {
    return await new Room().where('box_id', id).fetch()
  }

  get tableName() {
    return 'rooms'
  }

  get games() {
    return this.hasMany(Game)
  }

  async getLastGame() {
    const games = await this.games.orderBy('id').fetch()
    return games.last()
  }

  get hasTimestamps() {
    return true
  }
}
