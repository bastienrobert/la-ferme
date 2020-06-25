import React, { FC } from 'react'
import { RoundStep } from '@la-ferme/shared/typings'

import { RoundViewProps } from '../'
import New from './New'
import Card from './Card'
import Target from './Target'
import Confirm from './Confirm'

const Player: FC<RoundViewProps> = props => {
  switch (props.data.step) {
    case RoundStep.New:
      return <New {...props} />
    case RoundStep.Card:
      return <Card {...props} />
    case RoundStep.Target:
      return <Target {...props} />
    case RoundStep.Confirm:
      return <Confirm {...props} />
    default:
      return null
  }
}

export default Player
