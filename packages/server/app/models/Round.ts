import db from '@/config/database'

import Game from './Game'
import Player from './Player'

export default class Round extends db.bookshelf.Model<Round> {
  get tableName() {
    return 'rounds'
  }

  get hasTimestamps() {
    return true
  }

  get game() {
    return this.belongsTo(Game)
  }

  get player() {
    return this.belongsTo(Player)
  }

  get completed(): string {
    return this.get('completed')
  }

  set completed(value: string) {
    this.set({ completed: value })
  }
}
