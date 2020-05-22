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

  game() {
    return this.hasOne(Game)
  }

  set name(name: RegularizationName) {
    this.set({ name })
  }

  get name(): RegularizationName {
    return this.get('status')
  }
}
