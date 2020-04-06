export type UUID = string & { readonly _: unique symbol }

export interface User {
  uuid: UUID
  exists?: boolean
}
