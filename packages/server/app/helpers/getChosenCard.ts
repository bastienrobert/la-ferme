import { RoundChoice } from '@la-ferme/shared/typings'
import { getCard } from '@la-ferme/shared/data/cards'

import Round from '@/app/models/Round'

interface Cards {
  [RoundChoice.Civil]: string
  [RoundChoice.Uncivil]: string
}

export const getChosenCard = (cards: Cards, choice: RoundChoice) => {
  return getCard(cards[choice])
}

export const getChosenCardFromRound = (round: Round) => {
  return getChosenCard(
    {
      civil: round.civilCard,
      uncivil: round.uncivilCard
    },
    round.choice
  )
}
