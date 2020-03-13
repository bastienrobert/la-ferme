import Knex from 'knex'
import knexfile from '../knexfile'

const env = process.env.NODE_ENV || 'development'
const database = Knex(knexfile[env] as Knex.Config)

export default database
