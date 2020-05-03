import React, { FC } from 'react'
import Report from './Report'

export enum PopupType {
  REPORT = 'report'
}

const Popups: FC<any> = ({ type, players, boxID, userUUID }) => {
  switch (type) {
    case PopupType.REPORT:
      return <Report players={players} boxID={boxID} userUUID={userUUID} />
    default:
      return null
  }
}

export default Popups
