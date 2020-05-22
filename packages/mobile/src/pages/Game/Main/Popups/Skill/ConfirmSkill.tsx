import React, { FC } from 'react'
import { Button } from '@la-ferme/components/native'

const ConfirmSkill: FC<any> = ({ confirm }) => {
  const onButtonPress = () => confirm()

  return <Button onPress={onButtonPress}>OK</Button>
}

export default ConfirmSkill
