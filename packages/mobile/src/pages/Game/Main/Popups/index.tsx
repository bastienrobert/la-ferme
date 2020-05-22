import React, { FC } from 'react'
import { Player as PlayerType } from '@la-ferme/shared/typings'

import Report from './Report'
import Skill from './Skill'

export enum PopupType {
  REPORT = 'report',
  SKILL = 'skill'
}

export interface PopupProps {
  set: (type?: PopupType) => void
  params: { [key: string]: any }
  player: PlayerType
  players: PlayerType[]
}

const Popups: FC<any> = props => {
  const { type } = props

  switch (type) {
    case PopupType.REPORT:
      return <Report {...props} />
    case PopupType.SKILL:
      return <Skill {...props} />
    default:
      return null
  }
}

export default Popups
