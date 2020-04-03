import db from '@/config/database'

export default class Game extends db.bookshelf.Model<Game> {
  static async find(id) {
    return await new Game().where('id', id).fetch()
  }

  get tableName() {
    return 'games'
  }

  get hasTimestamps() {
    return true
  }

  get room() {
    // @ts-ignore
    return this.belongsTo('Room').fetch()
  }

  get rounds() {
    // @ts-ignore
    return this.hasMany('Round').fetch()
  }

  get creator() {
    // @ts-ignore
    // should take a user in params
    // return game creator
    return true
  }

  get players() {
    // @ts-ignore
    return this.hasMany('Player').fetch()
  }

  get winner(): string {
    return this.get('winner')
  }

  set winner(value: string) {
    // should take a player in params
    // should check player is in the game
    this.set({ winner: value })
  }
}
