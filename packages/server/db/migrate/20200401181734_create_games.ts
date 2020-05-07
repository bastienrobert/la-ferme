import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

  await knex.schema.createTable('games', table => {
    table.increments('id').primary()
    table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()'))
    table.integer('room_id').references('rooms.id').onDelete('cascade')

    table.timestamp('started_at')
    table.timestamp('won_at')
    table.timestamps(true, true)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('games')

  return
}
