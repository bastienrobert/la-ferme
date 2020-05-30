import React from 'react'
import { Button } from 'react-native'

const Samples = ({ navigation }) => {
  const navigate = route => () => navigation.navigate(route)

  return (
    <>
      <Button title="Pending" onPress={navigate('Sample:Pending')} />
      <Button title="Game" onPress={navigate('Sample:Game')} />
      <Button title="Notification" onPress={navigate('Sample:Notification')} />
      <Button title="Call" onPress={navigate('Sample:Call')} />
    </>
  )
}

export default Samples
