import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<any> {
  await knex('rooms').del()

  await knex('rooms').insert({ box_id: '99719f7a-52a7-4d0e-b794-4caf71c4bcce' })
  return
}
