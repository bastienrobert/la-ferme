import { Card, CardRewardType } from '@la-ferme/shared/typings'

const WATCHED_CARD_TYPES: CardRewardType[] = [CardRewardType.LoseRound]

export default (card: Card): boolean => {
  return WATCHED_CARD_TYPES.includes(card.reward.type)
}
