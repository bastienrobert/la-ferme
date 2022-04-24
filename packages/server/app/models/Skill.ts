import db from '@/config/database'

import Player from './Player'

export enum SkillStatus {
  Usable = 'USABLE',
  Using = 'USING',
  Used = 'USED'
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

  get usable() {
    return this.get('status') === SkillStatus.Usable
  }

  get using() {
    return this.get('status') === SkillStatus.Using
  }

  get used() {
    return this.get('status') === SkillStatus.Used
  }

  player() {
    return this.belongsTo(Player)
  }

  targets() {
    return this.belongsToMany(Player, 'skills_targets')
  }

  reset() {
    this.set({ status: SkillStatus.Usable })
    return this
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
