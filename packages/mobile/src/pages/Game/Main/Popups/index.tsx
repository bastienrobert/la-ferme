import React, { FC } from 'react'
import Report from './Report'

export enum PopupType {
  REPORT = 'report'
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
