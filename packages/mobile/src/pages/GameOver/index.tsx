import React, { FC } from 'react'
import { Typo, Button } from '@la-ferme/components/native'

const Game: FC<any> = ({ navigation, route }) => {
  const routeData = route?.params

  const onHomePress = () => {
    navigation.navigate('Home')
  }

  return (
    <>
      <Typo size="h1">Game over</Typo>
      <Typo size="h3">Win by {routeData?.winner}</Typo>
      <Button onPress={onHomePress}>Play again</Button>
    </>
  )
}

export default Game
