import React, { Component } from 'react'
import { View } from 'react-native'
import { Button } from '@la-ferme/components/native'

import RoundComplete from './RoundComplete'
import Typo from '@/components/Typo'

export default class CreateRoom extends Component<Page.IPageProps, any>
  implements Page.IPage {
  static load(): Promise<void> {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve()
      }, 1000)
    )
  }

  onHomePress = () => {
    this.props.goto('Home')
  }

  render() {
    return (
      <View>
        <Typo h1>La ferme</Typo>
        <Typo h2>Create room</Typo>
        <RoundComplete />
        <Button onPress={this.onHomePress}>Return to home</Button>
      </View>
    )
  }
}
