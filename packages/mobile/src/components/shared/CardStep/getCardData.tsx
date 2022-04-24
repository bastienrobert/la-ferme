import { CardStepType } from '.'

import CardPickUp, {
  RATIO as CARD_PICK_UP_RATIO
} from '@/components/cards/pick/up'
import CardPickDown, {
  RATIO as CARD_PICK_DOWN_RATIO
} from '@/components/cards/pick/down'

const up = {
  Card: CardPickUp,
  RATIO: CARD_PICK_UP_RATIO,
  image: require('@/assets/images/game/pick/civil.png')
}

const down = {
  Card: CardPickDown,
  RATIO: CARD_PICK_DOWN_RATIO,
  image: require('@/assets/images/game/pick/uncivil.png')
}

export default (type: CardStepType) => {
  return type === CardStepType.Civil ? up : down
}
