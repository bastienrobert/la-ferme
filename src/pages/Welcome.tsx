import React, { Component } from 'react'
import { View, Alert } from 'react-native'

import Typo from '~/components/Typo'
import Button from '~/components/shared/Button'

export default class Welcome extends Component {
  onPress = () => {
    console.log('salut les putes')
    Alert.alert('Meh', 'this is an alert')
  }

  render() {
    return (
      <View>
        <Typo h1>Hello world!</Typo>
        <Button onPress={this.onPress}>Yo!</Button>
      </View>
    )
  }
}
