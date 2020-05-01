import db from '@/config/database'

import Game from './Game'

export default class Room extends db.bookshelf.Model<Room> {
  static async findByBoxID(id, params?) {
    return await new Room().where('box_id', id).fetch(params)
  }

  get tableName() {
    return 'rooms'
  }

  get hasTimestamps() {
    return true
  }

  games() {
    return this.hasMany(Game)
  }

  async getLastGame(params?) {
    const games = await this.games()
      .orderBy('created_at', 'desc')
      .query(qb => qb.limit(1))
      .fetch(params)
    return games.first()
  }
}
