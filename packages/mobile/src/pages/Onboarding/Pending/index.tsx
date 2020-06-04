import React, { FC, useRef, useEffect, useContext } from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { Animated } from 'react-native'
import viewport from '@/services/viewport'
import styled from 'styled-components/native'

import ThemeContext from '@/App/Theme/Context'

import count from '@/assets/images/pending/count.png'
import leon from '@/assets/images/pending/icon/leon.png'
import isabelle from '@/assets/images/pending/icon/isabelle.png'
import monique from '@/assets/images/pending/icon/monique.png'
import peter from '@/assets/images/pending/icon/peter.png'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import { GAME_PLAYER_INFOS_QUERY } from '@/graphql/local'
import { READY_PLAYERS_QUERY, GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'

const Pending: FC<any> = ({ navigation }) => {
  const jauge = useRef(new Animated.Value(0)).current
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('gray')
  }, [setTheme])

  const gameInfosQuery = useQuery(GAME_PLAYER_INFOS_QUERY)
  const { gameUUID } = gameInfosQuery?.data ?? {}

  const playerIsReadyQuery = useQuery(READY_PLAYERS_QUERY, {
    variables: { gameUUID }
  })

  const gameUpdatedSubscription = useSubscription(GAME_UPDATED_SUBSCRIPTION, {
    variables: { gameUUID }
  })

  const players =
    gameUpdatedSubscription.data?.gameUpdated?.players ??
    playerIsReadyQuery.data?.getReadyPlayers ??
    []

  const current_player = players.filter(
    player => player.uuid !== gameInfosQuery?.data.player.uuid
  )

  const character_icon = player => {
    return player.character === 'monique'
      ? monique
      : player.character === 'peter'
      ? peter
      : player.character === 'isabelle'
      ? isabelle
      : leon
  }

  const everybodyIsReady =
    players.length > 0 && players.every(player => player.ready)

  useEffect(() => {
    if (!everybodyIsReady) return
    Animated.timing(jauge, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false
    }).start(() => {
      // navigation.navigate('Game:Main', { players })
    })
  }, [jauge, navigation, everybodyIsReady, players])

  return (
    <Component>
      <StyledInstructions>
        <Title preset="H1" color="beige">
          ATTENDEZ
        </Title>
        <StyledSubtitle>
          <Text text-align="center" color="yellow">
            #Comptez
          </Text>
          <Text text-align="center" color="yellow">
            les moutons
          </Text>
        </StyledSubtitle>
      </StyledInstructions>

      <StyledImage source={count} />

      <TopContainer>
        <Text textAlign="center" color="beige">
          Madame tortue prends tout son temps en caisse du supermarché.
        </Text>
        <Text textAlign="center" color="beige">
          Ne faites pas de salade et attendez que tout le monde soit prêt.
        </Text>
      </TopContainer>

      <MainContainer>
        <Jauge data={jauge} as={Animated.View} />

        {players
          .filter(player => player.uuid === gameInfosQuery?.data.player.uuid)
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
                  <AvatarReady color={'red'} source={character_icon(player)} />
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
                  <Avatar color={'red'} source={character_icon(player)} />
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

const StyledInstructions = styled(Container)`
  width: 90%;
  margin-top: 10%;
  margin-horizontal: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledSubtitle = styled(Container)`
  transform: rotate(-25deg);
  color: #ffba2a;
  position: absolute;
  right: 30px;
  top: 30px;
`

const StyledImage = styled.Image`
  width: 100%;
  top: 15%;
  resize-mode: cover;
  position: absolute;
`

const TopContainer = styled(Container)`
  width: 90%;
  height: 120px;
  margin-top: auto;
  margin-bottom: 80px;
  margin-horizontal: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-between;
`

const MainContainer = styled(Container)`
  width: 90%;
  margin-bottom: 5%;
  margin-horizontal: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`

const Jauge = styled(Container)`
  position: absolute;
  background: #fde9d5;
  width: ${props => props.data + 100 + '%'}
  height: 5px;
  top: 65%;
  left: -5.5%;
`

const StyledContainer = styled(Container)`
  min-width: 28%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.4;
`

const StyledContainerReady = styled(Container)`
  min-width: 28%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledTitle = styled(Container)`
  width: 100%;
  position: absolute;
  transform: rotate(-25deg);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  bottom: 80px;
  left: 30px;
`

const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => props.color};
  border: 4px solid transparent;
`

const AvatarReady = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${props => props.color};
  border: 4px solid #fde9d5;
`
