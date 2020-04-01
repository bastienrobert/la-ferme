import React, { useEffect } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import BootSplash from 'react-native-bootsplash'
import styled from 'styled-components/native'

import Router from './Router'
import apollo from './apollo'
import routes from './routes'

export default function App() {
  useEffect(() => {
    BootSplash.hide({ duration: 250 })
  }, [])

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <SafeAreaView>
        <ApolloProvider client={apollo}>
          <Router routes={routes} />
        </ApolloProvider>
      </SafeAreaView>
    </>
  )
}

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`
