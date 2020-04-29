import React, { FC, useEffect } from 'react'
import styled from 'styled-components/native'
import { useSubscription, useQuery, useMutation } from '@apollo/react-hooks'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import { GET_BOX_ID, NEW_USER_IN_ROOM_SUBSCRIPTION } from '@/graphql/room'
import { START_GAME_MUTATION, GAME_STATUS_SUBSCRIPTION } from '@/graphql/game'

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
          Un peu de patience ! Les joueurs rejoignent la partie !
        </Text>
      </ContentContainer>
      {data && <Users data={data.users} />}
    </>
  )
}

const Room: FC<any> = ({ navigation, route }) => {
  const routeData = route?.params

  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const [startGameMututation] = useMutation(START_GAME_MUTATION)
  const gameStatusSubscription = useSubscription(GAME_STATUS_SUBSCRIPTION, {
    variables: { boxID }
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
    console.log('JUST RECEIVED DATA')
    if (!gameStatusSubscription.data) return
    if (gameStatusSubscription.data?.gameStatus?.winnerUUID) return
    navigation.navigate('Onboarding:Hello')
  }, [gameStatusSubscription.data, navigation])

  const onStartPress = () => {
    startGameMututation({ variables: { boxID, userUUID: auth.uuid } })
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
