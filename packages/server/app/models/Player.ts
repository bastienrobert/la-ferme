import db from '@/config/database'

import Game from './Game'
import Round from './Round'
import User from './User'
import Skill from './Skill'
import Report from './Report'
import RoundTarget from './RoundTarget'

export default class Player extends db.bookshelf.Model<Player> {
  static async findByUUID(uuid, params?) {
    return await new Player().where({ uuid }).fetch(params)
  }

  get tableName() {
    return 'players'
  }

  get hasTimestamps() {
    return true
  }

  get uuid() {
    return this.get('uuid')
  }

  get score() {
    return this.get('score')
  }

  set character(character) {
    this.set({ character })
  }

  get character() {
    return this.get('character')
  }

  set goal(goal) {
    this.set({ goal })
  }

  get goal() {
    return this.get('goal')
  }

  surrender() {
    this.set('surrender', true)
    return this
  }

  skill() {
    return this.hasOne(Skill)
  }

  rounds() {
    return this.hasMany(Round)
  }

  game() {
    return this.belongsTo(Game)
  }

  user() {
    return this.belongsTo(User)
  }

  ready() {
    this.set({ ready: true })
  }

  targeted() {
    return this.hasMany(RoundTarget)
  }

  reports() {
    return this.hasMany(Report, 'from_player_id')
  }

  receivedReports() {
    return this.hasMany(Report, 'to_player_id')
  }

  increase(delta = 1) {
    this.set({ score: this.score + delta })
  }
}
