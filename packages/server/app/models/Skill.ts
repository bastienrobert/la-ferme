import db from '@/config/database'

import Player from './Player'

export enum SkillStatus {
  Usable = 'usable',
  Using = 'using',
  Used = 'used'
}

export default class Skill extends db.bookshelf.Model<Skill> {
  get tableName() {
    return 'skills'
  }

  get hasTimestamps() {
    return false
  }

  set name(name) {
    this.set({ name })
  }

  get name() {
    return this.get('name')
  }

  setPlayer(player_id) {
    this.set({ player_id })
  }

  player() {
    return this.belongsTo(Player)
  }

  get used() {
    return this.get('status') === SkillStatus.Used
  }

  use() {
    this.set({ status: SkillStatus.Using })
    return this
  }

  complete() {
    this.set({ status: SkillStatus.Used })
    return this
  }
}
