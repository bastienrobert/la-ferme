import db from '@/config/database'

import Room from './Room'

export default class Game extends db.bookshelf.Model<Game> {
  static async find(id) {
    return await new Game().where('id', id).fetch()
  }

  get tableName() {
    return 'games'
  }

  get hasTimestamps() {
    return false
  }

  get room() {
    const model = this.belongsTo(Room)
    return model.fetch()
  }

  get completed(): string {
    return this.get('completed')
  }

  set completed(value: string) {
    this.set({ completed: value })
  }
}
