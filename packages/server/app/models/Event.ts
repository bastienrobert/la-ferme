import db from '@/config/database'

import Game from './Game'
import Player from './Player'

enum EventStatus {
  NEW = 'new',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled'
}

// TODO:
// - skill "speaker": set last event where PLAYER to CANCELED
// - skill "shepherds-stick": change to_player_id to to from_player_id

export default class Event extends db.bookshelf.Model<Event> {
  get tableName() {
    return 'events'
  }

  get hasTimestamps() {
    return true
  }

  get type() {
    return this.get('type')
  }

  game() {
    return this.belongsTo(Game)
  }

  from() {
    return this.hasOne(Player, 'from_player_id')
  }

  to() {
    return this.hasOne(Player, 'to_player_id')
  }

  reverse() {
    const from = this.get('from_player_id')
    const to = this.get('to_player_id')
    this.set({
      from_player_id: to,
      to_player_id: from
    })
    return this
  }

  cancel() {
    this.set('status', EventStatus.CANCELED)
    return this
  }

  confirm() {
    this.set('status', EventStatus.CONFIRMED)
    return this
  }
}
