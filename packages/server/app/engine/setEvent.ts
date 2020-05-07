import { Card } from '@la-ferme/shared/typings'

interface SetEventOptions {
  card: Card
  targets: number[]
}

export default ({ card, targets }: SetEventOptions) => {
  console.log(card, 'players', targets)
}
