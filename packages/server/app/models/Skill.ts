import db from '@/config/database'

import Player from './Player'

export enum SkillStatus {
  USABLE = 'usable',
  USED = 'used'
}

export default class Skill extends db.bookshelf.Model<Skill> {
  get tableName() {
    return 'skills'
  }

  get hasTimestamps() {
    return false
  }

  set type(type) {
    this.set({ type })
  }

  get type() {
    return this.get('type')
  }

  setPlayer(player_id) {
    this.set({ player_id })
  }

  player() {
    return this.belongsTo(Player)
  }

  used() {
    this.set({ status: SkillStatus.USED })
    return this
  }
}
