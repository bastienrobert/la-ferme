import Knex from 'knex'

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('skills_targets', table => {
    table.integer('skill_id').unsigned().references('skills.id')
    table.integer('player_id').unsigned().references('players.id')
  })

  return
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('skills_targets')

  return
}
