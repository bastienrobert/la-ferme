import { WalktroughCardType } from './WalktroughCard'

import CardWalktroughUp, {
  RATIO as CARD_WALKTROUGH_UP_RATIO
} from '@/components/cards/walktrough/up'
import CardWalktroughDown, {
  RATIO as CARD_WALKTROUGH_DOWN_RATIO
} from '@/components/cards/walktrough/down'

import CardJustArrivedUp, {
  RATIO as CARD_JUST_ARRIVED_UP_RATIO
} from '@/components/cards/just_arrived/up'
import CardJustArrivedDown, {
  RATIO as CARD_JUST_ARRIVED_DOWN_RATIO
} from '@/components/cards/just_arrived/down'

const character = {
  Up: CardWalktroughUp,
  Down: CardWalktroughDown,
  RATIO_UP: CARD_WALKTROUGH_UP_RATIO,
  RATIO_DOWN: CARD_WALKTROUGH_DOWN_RATIO
}

const justArrived = {
  Up: CardJustArrivedUp,
  Down: CardJustArrivedDown,
  RATIO_UP: CARD_JUST_ARRIVED_UP_RATIO,
  RATIO_DOWN: CARD_JUST_ARRIVED_DOWN_RATIO
}

export default (type: WalktroughCardType) => {
  return type === 'character' ? character : justArrived
}
