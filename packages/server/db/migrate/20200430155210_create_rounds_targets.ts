import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('rounds_targets', table => {
    table.increments('id').primary()
    table.integer('round_id').references('rounds.id').onDelete('cascade')
    table.integer('player_id').references('players.id').onDelete('cascade')
    table
      .enu('status', ['new', 'reversed', 'canceled', 'completed'])
      .defaultTo('new')
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('rounds_targets')

  return
}
