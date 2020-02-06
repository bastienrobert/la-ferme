import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'

import Welcome from '~/pages/Welcome'

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Welcome />
      </SafeAreaView>
    </>
  )
}
