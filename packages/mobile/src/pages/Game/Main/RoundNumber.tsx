import React, { FC } from 'react'

import Text from '@/components/typo/Text'

const RoundNumber: FC<any> = ({ numberOfRounds, players }) => {
  if (typeof numberOfRounds !== 'number') return null

  return (
    <Text>
      CURRENT ROUND: {Math.floor((numberOfRounds - 1) / players.length) + 1}
    </Text>
  )
}

export default RoundNumber
