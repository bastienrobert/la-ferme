import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('skills', table => {
    table.increments('id').primary()
    table.string('name')
    table.enu('status', ['USABLE', 'USING', 'USED']).defaultTo('USABLE')
    table.integer('player_id').references('players.id').onDelete('cascade')
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('skills')

  return
}
