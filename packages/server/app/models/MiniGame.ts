import db from '@/config/database'

import Game from './Game'
import MiniGamePlayer from './MiniGamePlayer'

export default class MiniGame extends db.bookshelf.Model<MiniGame> {
  get tableName() {
    return 'mini_games'
  }

  game() {
    return this.hasOne(Game)
  }

  miniGamePlayer() {
    return this.hasMany(MiniGamePlayer)
  }

  over() {
    this.set({
      won_at: new Date(Date.now())
    })
  }
}
