import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('events', table => {
    table.increments('id').primary()
    table.integer('game_id').references('games.id').onDelete('cascade')
    table.integer('from_player_id').references('players.id').onDelete('cascade')
    table.integer('to_player_id').references('players.id').onDelete('cascade')
    table.string('type')
    table.enu('status', ['new', 'confirmed', 'canceled']).defaultTo('new')

    table.timestamps(true, true)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('events')

  return
}
