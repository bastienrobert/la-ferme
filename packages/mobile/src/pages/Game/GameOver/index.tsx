import React, { FC } from 'react'
import { Typo, Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'

const Game: FC<any> = ({ navigation, route }) => {
  const routeData = route?.params

  const onHomePress = () => {
    navigation.navigate('Home')
  }

  return (
    <>
      <Typo size="h1">Game over</Typo>
      <Typo size="h3">Win by {routeData?.winner}</Typo>
      <Container>
        <Button onPress={onHomePress}>Play again</Button>
      </Container>
    </>
  )
}

export default Game
