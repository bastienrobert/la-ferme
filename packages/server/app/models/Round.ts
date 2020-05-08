import db from '@/config/database'
import { RoundChoice, RoundStep } from '@la-ferme/shared/typings'

import Game from './Game'
import Player from './Player'
import RoundTarget from './RoundTarget'

export enum RoundType {
  Default = 'default',
  Replay = 'replay',
  Pass = 'pass'
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

  targets() {
    return this.hasMany(RoundTarget)
  }

  get civilCard() {
    return this.get('civil_card')
  }

  get uncivilCard() {
    return this.get('uncivil_card')
  }

  get choice(): RoundChoice {
    return this.get('choice')
  }

  set choice(choice: RoundChoice) {
    this.set({ choice })
  }

  get watch() {
    return this.get('watch')
  }

  set watch(watch: boolean) {
    this.set({ watch })
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
