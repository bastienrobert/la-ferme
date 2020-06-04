import React, { FC } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Button } from '@la-ferme/components/native'

import Text from '@/components/typo/Text'

import { LAST_TARGETER_QUERY } from '@/graphql/local'

const ConfirmSkillOnLastTargeter: FC<any> = ({ players, confirm }) => {
  const lastTargeterQuery = useQuery(LAST_TARGETER_QUERY)
  const lastTargeter = lastTargeterQuery?.data
    ? players.find(p => p.uuid === lastTargeterQuery?.data?.targeter)
    : undefined

  const onButtonPress = () => confirm()

  return lastTargeter ? (
    <>
      <Text color="beige">Last targeter was {lastTargeter.character}</Text>
      <Button onPress={onButtonPress}>OK</Button>
    </>
  ) : null
}

export default ConfirmSkillOnLastTargeter
