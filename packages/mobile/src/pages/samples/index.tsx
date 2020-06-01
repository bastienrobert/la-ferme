import React from 'react'
import { Button } from 'react-native'

import PlayerWithColor from '@/components/shared/PlayerWithColor'

const Samples = ({ navigation }) => {
  const navigate = route => () => navigation.navigate(route)

  return (
    <>
      <Button title="Pending" onPress={navigate('Sample:Pending')} />
      <Button title="Game" onPress={navigate('Sample:Game')} />
      <Button title="Notification" onPress={navigate('Sample:Notification')} />
      <Button title="Call" onPress={navigate('Sample:Call')} />
      <Button title="CardChoice" onPress={navigate('Sample:CardChoice')} />
      <PlayerWithColor size="large" character="leon" />
    </>
  )
}

export default Samples
