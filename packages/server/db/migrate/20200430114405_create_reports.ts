import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('reports', table => {
    table.increments('id').primary()
    table.integer('from_player_id').references('players.id').onDelete('cascade')
    table.integer('to_player_id').references('users.id').onDelete('cascade')
    table.float('score')
    table.enu('status', ['new', 'confirmed', 'canceled'])

    table.timestamp('connected_at').defaultTo(knex.fn.now())
    table.timestamp('disconnected_at')
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('reports')

  return
}