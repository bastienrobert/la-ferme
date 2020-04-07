import db from '@/config/database'

import Game from './Game'
import Round from './Round'
import User from './User'

export default class Player extends db.bookshelf.Model<Player> {
  get tableName() {
    return 'players'
  }

  get hasTimestamps() {
    return true
  }

  surrender() {
    this.set('surrender', true)
    return this
  }

  get game() {
    return this.belongsTo(Game)
  }

  get rounds() {
    return this.hasMany(Round)
  }

  get user() {
    return this.belongsTo(User)
  }

  set character(val) {
    this.set({ character: val })
  }

  set skill(val) {
    this.set({ skill: val })
  }

  set goal(val) {
    this.set({ goal: val })
  }
}
