import { ReportStatus } from '@la-ferme/shared/typings'

import db from '@/config/database'

import Player from './Player'
import Game from './Game'

export default class Report extends db.bookshelf.Model<Player> {
  get tableName() {
    return 'reports'
  }

  get hasTimestamps() {
    return true
  }

  get score(): number {
    return this.get('score')
  }

  set score(score: number) {
    this.set({ score })
  }

  get rounds(): number {
    return this.get('rounds')
  }

  set rounds(rounds: number) {
    this.set({ rounds })
  }

  get status(): ReportStatus {
    return this.get('status')
  }

  set status(status: ReportStatus) {
    this.set({ status })
  }

  game() {
    return this.hasOne(Game)
  }

  from() {
    return this.hasOne(Player, 'id', 'from_player_id')
  }

  to() {
    return this.hasOne(Player, 'id', 'to_player_id')
  }

  duplications() {
    return this.hasMany(Report, 'duplicate_id', 'id')
  }

  increase(delta = 1) {
    this.score = this.score + delta
  }

  completeRound() {
    this.rounds = this.rounds + 1
  }
}
