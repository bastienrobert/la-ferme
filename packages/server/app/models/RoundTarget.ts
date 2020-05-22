import db from '@/config/database'

import Round from './Round'
import Player from './Player'

export enum RoundTargetStatus {
  New = 'new',
  Reversed = 'reversed',
  Canceled = 'canceled',
  Completed = 'completed'
}

export default class RoundTarget extends db.bookshelf.Model<RoundTarget> {
  get tableName() {
    return 'rounds_targets'
  }

  get hasTimestamps() {
    return false
  }

  round() {
    return this.belongsTo(Round)
  }

  player() {
    return this.belongsTo(Player)
  }

  get status(): RoundTargetStatus {
    return this.get('status')
  }

  set status(status: RoundTargetStatus) {
    this.set({ status })
  }
}
