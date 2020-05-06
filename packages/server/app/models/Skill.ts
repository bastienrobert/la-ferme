import db from '@/config/database'

import Player from './Player'

export enum SkillStatus {
  Usable = 'usable',
  Used = 'used'
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
    return this.get('status') === SkillStatus.Used
  }

  use() {
    this.set({ status: SkillStatus.Used })
    return this
  }
}
