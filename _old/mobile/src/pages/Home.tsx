import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { elements } from '@la-ferme/components/native'

export default class Welcome extends Component<Page.IPageProps, any>
  implements Page.IPage {
  // onJoinPress = () => {
  //   this.props.goto('room/join')
  // }

  // onCreatePress = () => {
  //   this.props.goto('room/create')
  // }

  // onGLPress = () => {
  //   this.props.goto('opengl')
  // }

  render() {
    console.log(elements)

    return (
      <View>
        <Text>Hello</Text>
      </View>
    )
  }
}
