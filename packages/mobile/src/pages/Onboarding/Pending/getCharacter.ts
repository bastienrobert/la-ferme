import { Player } from '@la-ferme/shared/typings'

const images = {
  isabelle: require('@/assets/images/pending/isabelle.webp'),
  peter: require('@/assets/images/pending/peter.webp'),
  monique: require('@/assets/images/pending/monique.webp'),
  leon: require('@/assets/images/pending/leon.webp')
}

export default (player: Player) => {
  return images[player.character]
}
