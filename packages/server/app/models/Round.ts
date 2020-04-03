import db from '@/config/database'

export default class Round extends db.bookshelf.Model<Round> {
  get tableName() {
    return 'rounds'
  }

  get hasTimestamps() {
    return true
  }

  get game() {
    // @ts-ignore
    return this.belongsTo('Game').fetch()
  }

  get player() {
    // @ts-ignore
    return this.belongsTo('Player').fetch()
  }

  get completed(): string {
    return this.get('completed')
  }

  set completed(value: string) {
    this.set({ completed: value })
  }
}
