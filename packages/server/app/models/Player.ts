import db from '@/config/database'

import Game from './Game'
import Round from './Round'
import User from './User'
import Event from './Event'
import Skill from './Skill'
import Report from './Report'

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

  givenAccusations() {
    this.hasMany(Report, 'id', 'from_player_id')
  }

  receivedAccusations() {
    this.hasMany(Report, 'id', 'to_player_id')
  }

  givenEvents() {
    return this.hasMany(Event, 'id', 'from_player_id')
  }

  receivedEvents() {
    return this.hasMany(Event, 'id', 'to_player_id')
  }

  increaseScore(delta = 1) {
    this.set({ score: this.score + delta })
  }

  decreaseScore(delta = 1) {
    this.set({ score: this.score - delta })
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
}
