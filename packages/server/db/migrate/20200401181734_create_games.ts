import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('games', table => {
    table.increments('id').primary()
    table.boolean('completed').defaultTo(false)
    table
      .integer('room_id')
      .references('rooms.id')
      .onDelete('cascade')

    table.timestamps(true, true)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('games')

  return
}
