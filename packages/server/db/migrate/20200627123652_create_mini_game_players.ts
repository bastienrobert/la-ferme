import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('mini_games_players', table => {
    table.increments('id').primary()
    table.integer('player_id').unsigned().references('players.id')
    table.integer('mini_game_id').unsigned().references('mini_games.id')
    table.float('score').defaultTo(0)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('mini_games_players')

  return
}
