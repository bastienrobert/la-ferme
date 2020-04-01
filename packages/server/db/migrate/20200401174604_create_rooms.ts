import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('rooms', table => {
    table.increments('id').primary()
    table.timestamps()
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('rooms')

  return
}
