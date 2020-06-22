import React from 'react'
import { Button } from 'react-native'

import TextWithCurrentPlayer from '@/components/shared/TextWithCurrentPlayer'

const Samples = ({ navigation }) => {
  const navigate = route => () => navigation.navigate(route)

  return (
    <>
      <Button title="Pending" onPress={navigate('Sample:Pending')} />
      <Button title="Game" onPress={navigate('Sample:Game')} />
      <Button title="Notification" onPress={navigate('Sample:Notification')} />
      <Button title="Call" onPress={navigate('Sample:Call')} />
      <Button title="CardChoice" onPress={navigate('Sample:CardChoice')} />
      <TextWithCurrentPlayer
        text="Aujourd'hui, Monsieur Lane fait sa tête de mûle et ne veut pas cèder sa place prioritaire. %current% cède sa place à Madame Henriette la biquette et elle le remercie."
        character="leon"
      />
    </>
  )
}

export default Samples
