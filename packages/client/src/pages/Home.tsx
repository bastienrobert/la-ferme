import React, { Component } from 'react'
import { View } from 'react-native'

import Typo from '@/components/Typo'
import Button from '@/components/shared/Button'
import TextInput from '@/components/shared/TextInput'

export default class Welcome extends Component<Page.IPageProps, any>
  implements Page.IPage {
  static load() {
    return Promise.resolve()
  }

  onJoinPress = () => {
    this.props.goto('room/join')
  }

  onCreatePress = () => {
    this.props.goto('room/create')
  }

  onGLPress = () => {
    this.props.goto('opengl')
  }

  render() {
    return (
      <View>
        <Typo h1>La ferme</Typo>

        <TextInput placeholder="Votre nom" />
        <Button onPress={this.onJoinPress}>Rejoindre une room</Button>
        <Button onPress={this.onCreatePress}>Créer une room</Button>
        <Button onPress={this.onGLPress}>OpenGL</Button>
      </View>
    )
  }
}
