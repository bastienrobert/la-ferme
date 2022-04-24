import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  await knex.schema.createTable('rooms', table => {
    table.increments('id').primary()
    table.uuid('box_id').defaultTo(knex.raw('uuid_generate_v4()'))
    table.timestamps(true, true)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('rooms')

  return
}
