import db from '@/config/database'

import Player from './Player'
import Game from './Game'

export enum ReportStatus {
  Rejected = 'rejected',
  New = 'new',
  Confirmed = 'confirmed',
  Canceled = 'canceled'
}

export default class Report extends db.bookshelf.Model<Player> {
  get tableName() {
    return 'reports'
  }

  get hasTimestamps() {
    return true
  }

  game() {
    return this.hasOne(Game)
  }

  from() {
    return this.hasOne(Player, 'from_player_id')
  }

  to() {
    return this.hasOne(Player, 'to_player_id')
  }

  increase(delta = 1) {
    this.set({ score: this.score + delta })
  }

  set score(score: number) {
    this.set({ score })
  }

  get score(): number {
    return this.get('score')
  }

  set status(status: ReportStatus) {
    this.set({ status })
  }

  get status(): ReportStatus {
    return this.get('status')
  }
}
