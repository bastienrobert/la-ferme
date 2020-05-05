import React, { FC, useContext, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import ThemeContext from '@/App/Theme/Context'

import Walkthrough from '@/components/shared/Walkthrough'
import Text from '@/components/typo/Text'

import { GET_BOX_ID } from '@/graphql/room'
import { GET_PLAYER, PLAYER_READY_MUTATION } from '@/graphql/player'

import auth from '@/services/auth'

const Role: FC<any> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('red')
  }, [setTheme])

  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const playerQuery = useQuery(GET_PLAYER, {
    variables: { userUUID: auth.uuid }
  })
  const [playerReadyMutation] = useMutation(PLAYER_READY_MUTATION)

  const onReadyPress = () => {
    playerReadyMutation({ variables: { boxID, userUUID: auth.uuid } })
    navigation.navigate('Onboarding:Pending')
  }

  const userData = playerQuery?.data?.getPlayer

  if (!userData) return <Text color="gray">Fetching user</Text>

  return (
    <>
      <Walkthrough data={userData} onReadyPress={onReadyPress} />
    </>
  )
}

export default Role
