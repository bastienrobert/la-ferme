import db from '@/config/database'

import User from './User'

export default class Connection extends db.bookshelf.Model<Connection> {
  static async find(id) {
    return await new Connection().where('id', id).fetch()
  }

  get tableName() {
    return 'connections'
  }

  get hasTimestamps() {
    return false
  }

  get user() {
    return this.belongsTo(User)
  }

  disconnect() {
    this.set({ disconnected_at: new Date(Date.now()) })
    return this
  }
}
