import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('players', table => {
    table.increments('id').primary()
    table.integer('game_id').references('games.id').onDelete('cascade')
    table.integer('user_id').references('users.id').onDelete('cascade')
    table.string('character')
    table.string('goal')
    table.boolean('ready').defaultTo(false)
    table.boolean('surrender').defaultTo(false)

    table.timestamps(true, true)
  })

  await knex.schema.table('games', table => {
    table.integer('winner_player_id').references('players.id').onDelete('cascade') // prettier-ignore
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('players')

  return
}
