import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native'

import Router from '@/lib/Router'
import routes from './routes'

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Router base={routes.base} routes={routes.pages} />
      </SafeAreaView>
    </>
  )
}
