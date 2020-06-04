import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.table('players', table => {
    table.float('score').defaultTo(0)
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.table('players', table => {
    table.dropColumn('score')
  })

  return
}
