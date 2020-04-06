/* eslint-disable prettier/prettier */
import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('players', table => {
    table.increments('id').primary()
    table.string('character')
    table
      .integer('game_id')
      .references('games.id')
      .onDelete('cascade')
    table
      .integer('user_id')
      .references('users.id')
      .onDelete('cascade')

    table.timestamps(true, true)
  })

  await knex.schema.table('games', table => {
    table
      .integer('winner_id')
      .references('players.id')
      .onDelete('cascade')
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('players')

  return
}
