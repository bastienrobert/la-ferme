import { RoundChoice } from '@la-ferme/shared/typings'
import { getCard, roundChoiceToCardType } from '@la-ferme/shared/data/cards'

import Round from '@/app/models/Round'

interface Cards {
  civil: string
  uncivil: string
}

export const getChosenCard = (cards: Cards, choice: RoundChoice) => {
  const type = roundChoiceToCardType[choice]
  return getCard(cards[type])
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
