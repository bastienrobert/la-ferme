import React, { Component } from 'react'
import { View } from 'react-native'

import Typo from '@/components/Typo'

export default class CreateRoom extends Component<Page.IPageProps, any>
  implements Page.IPage {
  render() {
    return (
      <View>
        <Typo h1>La ferme</Typo>
        <Typo h2>Create room</Typo>
      </View>
    )
  }
}
