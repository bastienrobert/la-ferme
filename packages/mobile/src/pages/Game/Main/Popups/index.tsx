import React, { FC } from 'react'
import { Player as PlayerType } from '@la-ferme/shared/typings'

import Report from './Report'

export enum PopupType {
  REPORT = 'report'
}

export interface PopupProps {
  set: (type?: PopupType) => void
  player: PlayerType
  players: PlayerType[]
}

const Popups: FC<any> = props => {
  const { type } = props

  switch (type) {
    case PopupType.REPORT:
      return <Report {...props} />
    default:
      return null
  }
}

export default Popups
