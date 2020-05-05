import db from '@/config/database'

import Room from './Room'
import Round, { RoundType } from './Round'
import Event from './Event'
import User from './User'
import Report from './Report'
import Player from './Player'

export default class Game extends db.bookshelf.Model<Game> {
  static async find(id, params?) {
    return await new Game().where({ id }).fetch(params)
  }

  get tableName() {
    return 'games'
  }

  get hasTimestamps() {
    return true
  }

  room() {
    return this.belongsTo(Room)
  }

  rounds() {
    return this.hasMany(Round)
  }

  reports() {
    return this.hasMany(Report)
  }

  events() {
    return this.hasMany(Event)
  }

  creator() {
    return this.hasOne(User, 'id', 'creator_user_id')
  }

  players() {
    return this.hasMany(Player)
  }

  async numberOfRounds() {
    return await this.rounds().where({ type: RoundType.Classic }, false).count()
  }

  start() {
    this.set({ started_at: new Date(Date.now()) })
  }

  get startedAt() {
    return this.get('started_at')
  }

  set winner(value: number) {
    // should take a player in params
    // should check player is in the game
    this.set({
      winner_player_id: value,
      won_at: new Date(Date.now())
    })
  }

  get won() {
    return this.get('won_at')
  }
}
