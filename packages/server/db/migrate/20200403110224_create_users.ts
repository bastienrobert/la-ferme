import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.uuid('uuid').defaultTo(knex.raw('uuid_generate_v4()'))

    table.timestamps(true, true)
  })

  await knex.schema.table('games', table => {
    table.integer('creator_user_id').references('users.id').onDelete('cascade')
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('users')

  return
}
