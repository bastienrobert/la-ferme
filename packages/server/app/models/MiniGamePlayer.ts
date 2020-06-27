import db from '@/config/database'

import Player from './Player'
import MiniGame from './MiniGame'

export default class MiniGamePlayer extends db.bookshelf.Model<MiniGamePlayer> {
  get tableName() {
    return 'mini_games_players'
  }

  miniGame() {
    return this.hasOne(MiniGame)
  }

  players() {
    return this.hasMany(Player)
  }

  get score() {
    return this.get('score')
  }

  set score(score: number) {
    this.set({ score })
  }
}
