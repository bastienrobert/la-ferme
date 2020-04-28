import React, { useState, useEffect, useContext } from 'react'
import { StatusBar, Platform } from 'react-native'
import { ApolloProvider, useLazyQuery } from '@apollo/react-hooks'
import BootSplash from 'react-native-bootsplash'
import styled from 'styled-components/native'
import { Colors } from '@la-ferme/components/native'

import Router from './Router'
import ThemeContext from './Theme/Context'
import useTheme from './Theme/hook'
import apollo from './apollo'
import routes from './routes'

import { GET_USER_QUERY } from '@/graphql/user'

import auth from '@/services/auth'

function Main() {
  const [ready, setReady] = useState(false)
  const [getUser, { data }] = useLazyQuery(GET_USER_QUERY)
  const { theme } = useContext(ThemeContext)

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

  return (
    <GlobalSafeAreaView background={theme}>
      <Router routes={routes} />
    </GlobalSafeAreaView>
  )
}

export default function App() {
  const theme = useTheme()

  return (
    <>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <ApolloProvider client={apollo}>
        <ThemeContext.Provider value={theme}>
          <Main />
        </ThemeContext.Provider>
      </ApolloProvider>
    </>
  )
}

const GlobalSafeAreaView = styled.SafeAreaView<any>`
  flex: 1;
  background-color: ${props => Colors[props.background] || Colors.gray};
`
