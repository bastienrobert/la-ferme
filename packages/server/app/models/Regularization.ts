import { RegularizationName } from '@la-ferme/shared/typings'

import db from '@/config/database'

import Game from './Game'

export default class Regularization extends db.bookshelf.Model<Regularization> {
  get tableName() {
    return 'regularizations'
  }

  get hasTimestamps() {
    return true
  }

  get name(): RegularizationName {
    return this.get('status')
  }

  set name(name: RegularizationName) {
    this.set({ name })
  }

  game() {
    return this.hasOne(Game)
  }
}
