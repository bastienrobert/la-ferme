import db from '@/config/database'
import { RoundChoice, RoundStep } from '@la-ferme/shared/typings'

import Game from './Game'
import Player from './Player'

export enum RoundType {
  CLASSIC = 'classic',
  REPLAY = 'replay',
  PASS = 'pass'
}

export default class Round extends db.bookshelf.Model<Round> {
  get tableName() {
    return 'rounds'
  }

  get hasTimestamps() {
    return true
  }

  game() {
    return this.belongsTo(Game)
  }

  player() {
    return this.belongsTo(Player)
  }

  get choice(): RoundChoice {
    return this.get('choice')
  }

  set choice(choice: RoundChoice) {
    this.set({ choice })
  }

  get type(): RoundType {
    return this.get('type')
  }

  set type(type: RoundType) {
    this.set({ type })
  }

  get step(): RoundStep {
    return this.get('step')
  }

  set step(step: RoundStep) {
    this.set({ step })
  }
}
