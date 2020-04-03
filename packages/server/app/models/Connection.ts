import db from '@/config/database'

export default class Connection extends db.bookshelf.Model<Connection> {
  static async save(connection: Connection) {
    return await connection.save()
  }

  get tableName() {
    return 'connections'
  }

  get hasTimestamps() {
    return false
  }

  get user() {
    // @ts-ignore
    return this.belongsTo('User').fetch()
  }
}
