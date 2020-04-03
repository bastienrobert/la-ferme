import db from '@/config/database'

export default class User extends db.bookshelf.Model<User> {
  static async find(id) {
    return await new User().where('id', id).fetch()
  }

  static async findByUUID(uuid) {
    return await new User().where('uuid', uuid).fetch()
  }

  static async create() {
    return await new User().save()
  }

  static async save(user: User) {
    return await user.save()
  }

  get tableName() {
    return 'users'
  }

  get hasTimestamps() {
    return true
  }

  get uuid() {
    return this.get('uuid')
  }

  get players() {
    // @ts-ignore
    return this.hasMany('Player').fetch()
  }

  get connections() {
    // @ts-ignore
    return this.hasMany('Connection').fetch()
  }
}
