import db from '@/config/database'

export default class Game extends db.bookshelf.Model<Game> {
  get tableName() {
    return 'games'
  }

  get hasTimestamps() {
    return false
  }
}
