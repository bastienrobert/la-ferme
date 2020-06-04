import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('reports', table => {
    table.increments('id').primary()
    table.integer('game_id').references('games.id').onDelete('cascade')
    table.integer('duplicate_id').references('reports.id').onDelete('cascade')
    table.integer('from_player_id').references('players.id').onDelete('cascade')
    table.integer('to_player_id').references('players.id').onDelete('cascade')
    table.float('rounds').defaultTo(0)
    table.float('score').defaultTo(0)
    table
      .enu('status', [
        'new',
        'confirmed',
        'duplicated',
        'reversed',
        'completed'
      ])
      .defaultTo('new')

    table.timestamps(true, true)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('reports')

  return
}
