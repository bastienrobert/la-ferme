import React, { useEffect } from 'react'
import { StatusBar, SafeAreaView, Platform, StyleSheet } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import BootSplash from 'react-native-bootsplash'

import Router from '@/lib/Router'
import routes from './routes'
import apollo from './apollo'

function Main() {
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <SafeAreaView style={styles.SafeAreaView}>
        <ApolloProvider client={apollo}>
          <Router base={routes.base} routes={routes.pages} />
        </ApolloProvider>
      </SafeAreaView>
    </>
  )
}

export default function App() {
  useEffect(() => {
    BootSplash.hide({ duration: 250 })
  }, [])

  return <Main />
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1
  }
})
