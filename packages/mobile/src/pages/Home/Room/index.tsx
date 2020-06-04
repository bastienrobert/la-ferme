import React, { FC, useEffect } from 'react'
import styled from 'styled-components/native'
import { useSubscription, useQuery, useMutation } from '@apollo/react-hooks'
import { GameStatusType } from '@la-ferme/shared/typings'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import { GAME_INFOS_QUERY } from '@/graphql/local'
import { NEW_USER_IN_ROOM_SUBSCRIPTION } from '@/graphql/room'
import { START_GAME_MUTATION, GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'

import auth from '@/services/auth'

import Users from './Users'

const Owner: FC<any> = ({ data }) => {
  return (
    <>
      <TitleContainer>
        <Title preset="H1" color="beige" textAlign="center">
          indiquez que tout le monde est là !
        </Title>
      </TitleContainer>
      <ContentContainer>
        <Title preset="H4" color="beige" textAlign="center">
          une partie peut contenir entre{' '}
          <Title preset="H4" color="yellow">
            2
          </Title>{' '}
          et{' '}
          <Title preset="H4" color="yellow">
            4
          </Title>{' '}
          joueurs
        </Title>
      </ContentContainer>
      {data && <Users data={data.users} />}
    </>
  )
}

const Player: FC<any> = ({ data }) => {
  return (
    <>
      <TitleContainer>
        <Title preset="H1" color="beige" textAlign="center">
          attendez
        </Title>
      </TitleContainer>
      <ContentContainer>
        <Text color="beige" textAlign="center">
          Un peu de patience ! Les joueurs rejoignent la partie !
        </Text>
      </ContentContainer>
      {data && <Users data={data.users} />}
    </>
  )
}

// TODO !!!
// set props
const Room: FC<any> = ({ navigation, route }) => {
  const routeData = route?.params

  const gameInfosQuery = useQuery(GAME_INFOS_QUERY)
  const { boxID, player, gameUUID } = gameInfosQuery?.data ?? {}

  const [startGameMututation] = useMutation(START_GAME_MUTATION)
  const gameUpdatedSubscription = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { gameUUID }
  })
  const newUserInRoomSubscription = useSubscription(
    NEW_USER_IN_ROOM_SUBSCRIPTION,
    {
      variables: { boxID }
    }
  )

  const owner = routeData?.creatorUUID === auth.uuid

  // TODO
  // subscription should be cancelled when React navigation focus blur
  useEffect(() => {
    if (!navigation.isFocused) return
    const data = gameUpdatedSubscription.data?.gameUpdated
    if (!data || data.type !== GameStatusType.Start) return
    navigation.navigate('Onboarding:Hello')
  }, [gameUpdatedSubscription.data, navigation])

  const onStartPress = () => {
    startGameMututation({ variables: { playerUUID: player.uuid } })
  }

  const data = newUserInRoomSubscription.data?.connectedUsers || routeData

  return (
    <Component>
      <StyledContainer>
        {owner ? <Owner data={data} /> : <Player data={data} />}
      </StyledContainer>
      {owner && (
        <ButtonView>
          <ButtonContainer>
            <Button disabled={data?.users?.length < 2} onPress={onStartPress}>
              PRÊÊÊÊT
            </Button>
          </ButtonContainer>
        </ButtonView>
      )}
    </Component>
  )
}

const Component = styled(FullContainer)`
  align-items: center;
  justify-content: space-between;
`

const StyledContainer = styled(FullContainer)`
  align-items: center;
  justify-content: center;
`

const TitleContainer = styled(Container)`
  width: 80%;
  align-self: center;
  margin-bottom: 30px;
`

const ContentContainer = styled(Container)`
  width: 70%;
  align-self: center;
  margin-bottom: 80px;
`

const ButtonContainer = styled(Container)`
  align-self: center;
`

const ButtonView = styled.View`
  justify-content: flex-end;
  margin-bottom: 40px;
  z-index: 2;
`

export default Room
