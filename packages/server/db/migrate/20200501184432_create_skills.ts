import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('skills', table => {
    table.increments('id').primary()
    table.string('type')
    table.enu('status', ['usable', 'used']).defaultTo('usable')
    table.integer('player_id').references('players.id').onDelete('cascade') // prettier-ignore
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('skills')

  return
}