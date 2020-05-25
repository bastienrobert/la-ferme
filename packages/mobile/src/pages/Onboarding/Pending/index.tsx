import React, { FC, useEffect, useContext } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'

import styled from 'styled-components'

import ThemeContext from '@/App/Theme/Context'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'

import { GET_BOX_ID } from '@/graphql/room'
import { READY_PLAYERS_QUERY } from '@/graphql/game'
import { PLAYER_IS_READY_SUBSCRIPTION } from '@/graphql/player'
import viewport from '@/services/viewport'

const Pending: FC<any> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('gray')
  }, [setTheme])

  const boxIDQuery = useQuery(GET_BOX_ID)
  const boxID = boxIDQuery?.data?.boxID

  const playerIsReadyQuery = useQuery(READY_PLAYERS_QUERY, {
    variables: { boxID }
  })

  const playerIsReadySubscription = useSubscription(
    PLAYER_IS_READY_SUBSCRIPTION,
    { variables: { boxID } }
  )

  const players =
    playerIsReadySubscription.data?.playerIsReady?.players ??
    playerIsReadyQuery.data?.getReadyPlayers ??
    []

  const everybodyIsReady =
    players.length > 0 && players.every(player => player.ready)

  useEffect(() => {
    if (!everybodyIsReady) return
    navigation.navigate('Game')
  }, [navigation, everybodyIsReady])

  return (
    <Component>
      <Title preset="H1" color="beige">
        ATTENDEZ
      </Title>
      <MainContainer>
        <Jauge data={players.length} />
        {players
          .sort((x, y) => {
            return x.ready - y.ready
          })
          .map((player, i) => {
            if (player.ready === false) {
              return (
                <StyledContainerReady key={i}>
                  <StyledTitle>
                    <Title preset="H4" color="beige">
                      {player.character !== null ? player.character : 'NAME'}
                    </Title>
                  </StyledTitle>

                  <AvatarReady />
                </StyledContainerReady>
              )
            } else {
              return (
                <StyledContainer key={i}>
                  <StyledTitle>
                    <Title preset="H4" color="beige">
                      {player.character !== null ? player.character : 'NAME'}{' '}
                    </Title>
                  </StyledTitle>
                  <Avatar />
                </StyledContainer>
              )
            }
          })}
      </MainContainer>
    </Component>
  )
}

export default Pending

const Component = styled(FullContainer)`
  width: ${viewport.width}px;
  height: ${viewport.height}px;
`

const StyledTitle = styled(Container)`
  transform: rotate(-25deg);
  margin-bottom: 15px;
  margin-left: 30px;
`

const MainContainer = styled(Container)`
  width: 90%;
  margin-top: auto;
  margin-horizontal: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Jauge = styled(Container)`
  position: absolute;
  background-color: white;
  width: ${props => 100 / props.data + 5.5}%;
  height: 5px;
  top: 65%;
  left: -5.5%;
`

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
`

const StyledContainerReady = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Avatar = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: red;
`

const AvatarReady = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  background-color: red;
  border: 5px solid white;
`
