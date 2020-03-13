var dotenv = require('dotenv')
dotenv.load()

const env = process.env.NODE_ENV
const config = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_DATABASE,
    charset: 'utf8'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: `${__dirname}/db/migrations`
  }
}

if (env === 'development') {
  config.seeds = {
    directory: `${__dirname}/db/seeds`
  }
}

module.exports[env] = config
