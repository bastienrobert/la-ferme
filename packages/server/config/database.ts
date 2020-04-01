import Knex from 'knex'
import Bookshelf from 'bookshelf'

import knexfile from '@/knexfile'

class Database {
  protected _knex: Knex = null
  protected _bookshelf: Bookshelf = null

  constructor() {
    this._knex = Knex(knexfile)
    this._bookshelf = Bookshelf(this._knex)
  }

  public get knex(): Knex {
    return this._knex
  }

  public get bookshelf(): Bookshelf {
    return this._bookshelf
  }
}

export default new Database()
