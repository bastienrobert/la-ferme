/* eslint-disable prettier/prettier */
import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('rounds', table => {
    table.increments('id').primary()
    table.boolean('completed').defaultTo(false)
    table
      .integer('game_id')
      .references('games.id')
      .onDelete('cascade')
    table
      .integer('player_id')
      .references('players.id')
      .onDelete('cascade')
    table.integer('civil_card_id')
    table.integer('uncivil_card_id')
    table.integer('chosen_card_id')
    table
      .integer('target_id')
      .references('players.id')
      .onDelete('cascade')

    table.timestamps(true, true)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('rounds')

  return
}
