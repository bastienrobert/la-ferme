import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<any> {
  await knex('rooms').del()

  await knex('rooms').insert({})
  return
}
