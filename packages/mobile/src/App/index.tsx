import React, { useState, useEffect } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider, useLazyQuery } from '@apollo/react-hooks'
import BootSplash from 'react-native-bootsplash'
import styled from 'styled-components/native'

import Router from './Router'
import apollo from './apollo'
import routes from './routes'

import { USER_GET_QUERY } from '@/graphql/user'

import auth from '@/utils/auth'

function Main() {
  const [ready, setReady] = useState(false)
  const [getUser, { data }] = useLazyQuery(USER_GET_QUERY)

  useEffect(() => {
    auth.local().then(uuid => getUser({ variables: { uuid } }))
  }, [getUser])

  useEffect(() => {
    if (!data) return
    const { uuid } = data.getUser
    auth.set(uuid).then(() => setReady(true))
  }, [data])

  useEffect(() => {
    if (!ready) return
    auth.ready()
    BootSplash.hide({ duration: 250 })
  }, [ready])

  return <Router routes={routes} />
}

export default function App() {
  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <SafeAreaView>
        <ApolloProvider client={apollo}>
          <Main />
        </ApolloProvider>
      </SafeAreaView>
    </>
  )
}

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`
