import db from '@/config/database'

import Round from './Round'
import Player from './Player'

export enum RoundTargetStatus {
  New = 'NEW',
  Reversed = 'REVERSED',
  Canceled = 'CANCELED',
  Completed = 'COMPLETED'
}

export default class RoundTarget extends db.bookshelf.Model<RoundTarget> {
  get tableName() {
    return 'rounds_targets'
  }

  get hasTimestamps() {
    return false
  }

  get status(): RoundTargetStatus {
    return this.get('status')
  }

  set status(status: RoundTargetStatus) {
    this.set({ status })
  }

  round() {
    return this.belongsTo(Round)
  }

  player() {
    return this.belongsTo(Player)
  }
}
