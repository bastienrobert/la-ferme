import db from '@/config/database'

import Player from './Player'

export enum ReportStatus {
  REJECTED = 'rejected',
  NEW = 'new',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled'
}

export default class Report extends db.bookshelf.Model<Player> {
  get tableName() {
    return 'reports'
  }

  get hasTimestamps() {
    return true
  }

  from() {
    return this.hasOne(Player, 'from_player_id')
  }

  to() {
    return this.hasOne(Player, 'to_player_id')
  }

  increaseScore(delta = 1) {
    this.set({ score: this.score + delta })
  }

  decreaseScore(delta = 1) {
    this.set({ score: this.score - delta })
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
