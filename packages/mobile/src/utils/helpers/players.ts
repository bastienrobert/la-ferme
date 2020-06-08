import { Player } from '@la-ferme/shared/typings'

export const getAllExceptCurrent = (players: Player[], current: Player) => {
  return players.filter(player => current.uuid !== player.uuid)
}

export const sortByNameLength = (players: Player[]) => {
  return players.sort((p1, p2) => p2.character.length - p1.character.length)
}

export const images = {
  peter: require('@/assets/images/characters/peter.png'),
  monique: require('@/assets/images/characters/monique.png'),
  isabelle: require('@/assets/images/characters/isabelle.png'),
  leon: require('@/assets/images/characters/leon.png')
}
