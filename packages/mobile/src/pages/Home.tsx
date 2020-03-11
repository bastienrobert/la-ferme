import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Button } from '@la-ferme/components/native'

export default class Welcome extends Component<Page.IPageProps, any>
  implements Page.IPage {
  onCreatePress = () => {
    this.props.goto('Room:Create')
  }

  render() {
    return (
      <View>
        <Text>Hell</Text>
        <Button onPress={this.onCreatePress}>Create room</Button>
      </View>
    )
  }
}
