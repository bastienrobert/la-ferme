import React from 'react'
import { View, Text } from 'react-native'
import gql from 'graphql-tag'
import { useSubscription } from '@apollo/react-hooks'

const ROUND_SUBSCRIPTION = gql`
  subscription roundCompleted {
    roundCompleted
  }
`

export default function RoundComplete() {
  const { data, loading } = useSubscription(ROUND_SUBSCRIPTION)

  return !loading && data ? <Text>{data.roundCompleted}</Text> : null
}
