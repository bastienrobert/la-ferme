import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('regularizations', table => {
    table.increments('id').primary()
    table.integer('game_id').references('games.id').onDelete('cascade')
    table.enu('name', ['REWARD', 'PENALTY'])

    table.timestamps(true, true)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('regularizations')

  return
}
