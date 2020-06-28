import db from '@/config/database'

import Game from './Game'
import Player from './Player'
import MiniGamePlayer from './MiniGamePlayer'

export default class MiniGame extends db.bookshelf.Model<MiniGame> {
  static async findByUUID(uuid, params?) {
    return await new MiniGame().where({ uuid }).fetch(params)
  }

  get tableName() {
    return 'mini_games'
  }

  get uuid() {
    return this.get('uuid')
  }

  get name() {
    return this.get('name')
  }

  game() {
    return this.belongsTo(Game)
  }

  players() {
    return this.belongsToMany(Player).through(MiniGamePlayer)
  }

  miniGamePlayers() {
    return this.hasMany(MiniGamePlayer)
  }

  over() {
    this.set({
      won_at: new Date(Date.now())
    })
  }
}
