// validations
// all returns promises

import Knex from 'knex'

//* add
// create
// new -> save

//* read
// all
// first
// find_by
// where
// can order...

//* update
// get, edit then save

//* delete
// destroy

const TIMEOUT = 1000

export interface IBase {
  knex: Knex
  name: string
}

/**
 * Base should take a type in params to be sure props are this type
 * returning should take an array to be sure it'll receive an object with these keys
 */
export default function Base({ knex, name }) {
  function create(props, returning = []) {
    delete props.id

    return knex
      .insert(props)
      .returning(returning)
      .into(name)
      .timeout(TIMEOUT)
  }

  return { create }
}
