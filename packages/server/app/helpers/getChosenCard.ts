import { RoundChoice } from '@la-ferme/shared/typings'
import { getCard } from '@la-ferme/shared/data/cards'

interface Cards {
  [RoundChoice.Civil]: string
  [RoundChoice.Uncivil]: string
}

export default (cards: Cards, choice: RoundChoice) => {
  return getCard(cards[choice])
}
