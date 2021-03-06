import React, { FC, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components/native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import FastImage from 'react-native-fast-image'
import LottieView from 'lottie-react-native'
import { global as globalData } from '@la-ferme/shared/data'

import { RootStackParamList } from '@/App/routes'

import Go from './Go'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import TitleWithHashtag from '@/components/shared/TitleWithHashtag'
import PlayersReady from '@/components/shared/PlayersReady'
import Text from '@/components/typo/Text'

import { GAME_PLAYER_INFOS_QUERY } from '@/graphql/local'
import { READY_PLAYERS_QUERY, GAME_UPDATED_SUBSCRIPTION } from '@/graphql/game'

import useTheme from '@/hooks/useTheme'
import viewport from '@/services/viewport'

const imagesByCharacter = {
  isabelle: require('@/assets/images/pending/isabelle.webp'),
  peter: require('@/assets/images/pending/peter.webp'),
  monique: require('@/assets/images/pending/monique.webp'),
  leon: require('@/assets/images/pending/leon.webp')
}

const content = globalData.pending

type OnboardingPendingRouteProp = RouteProp<
  RootStackParamList,
  'Onboarding:Pending'
>
type OnboardingPendingNavigationProp = NavigationProp<
  RootStackParamList,
  'Onboarding:Pending'
>

export interface OnboardingPendingProps {
  route: OnboardingPendingRouteProp
  navigation: OnboardingPendingNavigationProp
}

const Pending: FC<OnboardingPendingProps> = ({ navigation }) => {
  const { setTheme } = useTheme()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTheme('gray')
  }, [setTheme])

  const gameInfosQuery = useQuery(GAME_PLAYER_INFOS_QUERY)
  const { gameUUID, player } = gameInfosQuery?.data ?? {}

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

  const currentPlayer = players.find(p => p.uuid === player?.uuid)

  useEffect(() => {
    if (!ready) return
    setTimeout(() => navigation.navigate('Game:Main', { players }), 2000)
  }, [ready, navigation, players])

  const onEveryReady = useCallback(() => {
    setReady(true)
  }, [setReady])

  return (
    <FullContainer>
      <TopContainer alignSelf="center">
        <TitleWithHashtag
          anchor="right"
          titleColor="beige"
          hashtagColor="yellow"
          hashtagOffset={{ y: 40 }}
          {...content.title}
        />
      </TopContainer>
      <ImageContainer>
        <BackgroundAnimation
          source={require('@/assets/lottie/pending_numbers.json')}
          autoPlay
        />
        <Character
          source={imagesByCharacter[currentPlayer?.character]}
          resizeMode={FastImage.resizeMode.contain}
        />
      </ImageContainer>
      <TextContainer>
        {content.text.map((line, i) => (
          <DescriptionText
            key={`pending-text-${i}`}
            color="beige"
            textAlign="center">
            {line}
          </DescriptionText>
        ))}
      </TextContainer>
      <PlayersReady onEveryReady={onEveryReady} players={players} />
      {ready && <Go />}
    </FullContainer>
  )
}

const TopContainer = styled(Container)`
  margin-top: 140px;
`

const ImageContainer = styled(FullContainer)`
  position: relative;
  justify-content: center;
  align-items: center;
  margin-bottom: 120px;
`

const TextContainer = styled(FullContainer)`
  position: relative;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 350px;
`

const BackgroundAnimation = styled(LottieView)`
  position: absolute;
  top: 50px;
  left: 0;
  width: ${viewport.width}px;
  transform: scale(1.25) translateY(-50px);
`

const Character = styled(FastImage)`
  width: 400px;
  height: 400px;
  margin: auto;
`

const DescriptionText = styled(Text)`
  padding-bottom: 20px;
`

export default Pending
