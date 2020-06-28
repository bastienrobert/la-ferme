import { Player, Character } from '@la-ferme/shared/typings'
import { characters } from '@la-ferme/shared/data'

export const charactersByName: { [key: string]: Character } = characters.reduce(
  (acc, c) => {
    acc[c.name] = c
    return acc
  },
  {}
)

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

export const winImages = {
  isabelle: require('@/assets/images/win/isabelle.webp'),
  leon: require('@/assets/images/win/leon.webp'),
  monique: require('@/assets/images/win/monique.webp'),
  peter: require('@/assets/images/win/peter.webp')
}

export const looseImages = {
  isabelle: require('@/assets/images/loose/isabelle.webp'),
  leon: require('@/assets/images/loose/leon.webp'),
  monique: require('@/assets/images/loose/monique.webp'),
  peter: require('@/assets/images/loose/peter.webp')
}
