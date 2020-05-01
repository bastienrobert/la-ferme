import User from '@/app/models/User'
import Player from '@/app/models/Player'

export default (user: User): Player => {
  return user
    .related('players')
    .orderBy('created_at', 'DESC')
    .query(qb => qb.limit(1))
    .last()
}
