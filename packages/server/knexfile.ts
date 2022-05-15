import Knex from 'knex'
import dotenv from 'dotenv'

dotenv.config()

const env = process.env.NODE_ENV || 'development'

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    charset: 'utf8'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/db/migrate`
  }
}

if (env === 'development') {
  config.seeds = {
    directory: `${__dirname}/db/seeds`
  }
}

module.exports = { [env]: config }
export default config
