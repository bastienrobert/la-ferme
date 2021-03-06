import db from '@/config/database'

import Room from './Room'
import Round, { RoundType } from './Round'
import User from './User'
import Report from './Report'
import Player from './Player'

export default class Game extends db.bookshelf.Model<Game> {
  static async find(id, params?) {
    return await new Game().where({ id }).fetch(params)
  }

  static async findByUUID(uuid, params?) {
    return await new Game().where({ uuid }).fetch(params)
  }

  get tableName() {
    return 'games'
  }

  get hasTimestamps() {
    return true
  }

  get uuid() {
    return this.get('uuid')
  }

  get startedAt() {
    return this.get('started_at')
  }

  get won() {
    return this.get('won_at')
  }

  set winner(value: number) {
    // should take a player in params
    // should check player is in the game
    this.set({
      winner_player_id: value,
      won_at: new Date(Date.now())
    })
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

  creator() {
    return this.hasOne(User, 'id', 'creator_user_id')
  }

  players() {
    return this.hasMany(Player)
  }

  presentPlayers() {
    return this.hasMany(Player).where({ surrender: false }, false)
  }

  async averageScore() {
    const players = await this.players().fetch()
    const sum = players.reduce((acc, { score }) => acc + score, 0)
    return sum / players.length
  }

  async numberOfRounds() {
    return Number(
      await this.rounds().where({ type: RoundType.Default }, false).count()
    )
  }

  start() {
    this.set({ started_at: new Date(Date.now()) })
  }
}
