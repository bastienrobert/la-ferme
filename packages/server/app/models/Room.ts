import db from '@/config/database'

import Game from './Game'

export default class Room extends db.bookshelf.Model<Room> {
  static async findByBoxID(box_id, params?) {
    return await new Room().where({ box_id }).fetch(params)
  }

  get tableName() {
    return 'rooms'
  }

  get hasTimestamps() {
    return true
  }

  get boxID() {
    return this.get('box_id')
  }

  games() {
    return this.hasMany(Game)
  }

  async getLastGame(params?) {
    const game = await this.games()
      .orderBy('created_at', 'DESC')
      .query({ where: { won_at: null } })
      .fetchOne(params)
    return game
  }
}
