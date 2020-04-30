import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('targeted_players_rounds', table => {
    table.integer('player_id').unsigned().references('players.id')
    table.integer('round_id').unsigned().references('rounds.id')
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('targeted_players_rounds')

  return
}
