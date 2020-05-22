import { Player } from '@la-ferme/shared/typings'

export const getAllExceptCurrent = (players: Player[], current: Player) => {
  return players.filter(player => current.uuid !== player.uuid)
}
