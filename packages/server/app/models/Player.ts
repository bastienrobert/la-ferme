import db from '@/config/database'

export default class Player extends db.bookshelf.Model<Player> {
  get tableName() {
    return 'players'
  }

  get hasTimestamps() {
    return true
  }

  get game() {
    // @ts-ignore
    return this.belongsTo('Game').fetch()
  }

  get rounds() {
    // @ts-ignore
    return this.hasMany('Round').fetch()
  }

  get user() {
    // @ts-ignore
    return this.belongsTo('User').fetch()
  }
}
