import React, { Component } from 'react'
import { StatusBar, SafeAreaView, StyleSheet } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'

import Router from '@/lib/Router'
import routes from './routes'
import apollo from './apollo'

export interface IAppState {
  isSplashReady: boolean
  isAppReady: boolean
}

function Main() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.SafeAreaView}>
        <ApolloProvider client={apollo}>
          <Router base={routes.base} routes={routes.pages} />
        </ApolloProvider>
      </SafeAreaView>
    </>
  )
}

export default class App extends Component<void, IAppState> {
  state = {
    isSplashReady: false,
    isAppReady: false
  }

  render() {
    return <Main />
  }
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1
  }
})
