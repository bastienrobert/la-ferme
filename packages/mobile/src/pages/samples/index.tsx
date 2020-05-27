import React from 'react'
import { Button } from 'react-native'

const Samples = ({ navigation }) => {
  const navigate = route => () => navigation.navigate(route)

  return (
    <>
      <Button title="Pending" onPress={navigate('Sample:Pending')} />
      <Button title="Game" onPress={navigate('Sample:Game')} />
    </>
  )
}

export default Samples
