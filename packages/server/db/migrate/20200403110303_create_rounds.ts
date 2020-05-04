import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('rounds', table => {
    table.increments('id').primary()
    table.integer('game_id').references('games.id').onDelete('cascade')
    table.integer('player_id').references('players.id').onDelete('cascade')
    table.enu('step', ['new', 'board', 'complete']).defaultTo('new')
    table.enu('type', ['classic', 'replay', 'pass']).defaultTo('classic')
    table.string('civil_card')
    table.string('uncivil_card')
    table.enu('choice', ['civil', 'uncivil'])

    table.timestamps(true, true)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('rounds')

  return
}
