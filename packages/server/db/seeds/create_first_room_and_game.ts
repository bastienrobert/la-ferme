import * as Knex from 'knex'

export async function seed(knex: Knex): Promise<any> {
  await knex('games').del()
  await knex('rooms').del()

  await knex('rooms').insert([{ id: 1 }])
  await knex('games').insert([{ id: 1, room_id: 1 }])

  return
}
