import { Card, RoundChoice } from '../../typings'

import civil from './civil'
import uncivil from './uncivil'

const cards = [...civil, ...uncivil]

function getCard(name: string): Card {
  return cards.find(c => c.name === name)
}

export const roundChoiceToCardType = {
  [RoundChoice.Civil]: 'civil',
  [RoundChoice.Uncivil]: 'uncivil'
}

export { cards, getCard }

export default {
  civil,
  uncivil
}
