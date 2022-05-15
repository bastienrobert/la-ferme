import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('connections', table => {
    table.increments('id').primary()
    table.integer('user_id').references('users.id').onDelete('cascade')

    table.timestamp('connected_at').defaultTo(knex.fn.now())
    table.timestamp('disconnected_at')
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('connections')

  return
}
