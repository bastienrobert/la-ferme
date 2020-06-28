import React, { FC, useState, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'
import { Colors } from '@la-ferme/components/native'

import { PendingState } from './'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import TitleWithHashtag from '@/components/shared/TitleWithHashtag'

const animationsByState = {
  go: require('@/assets/lottie/minigame_go.json'),
  stop: require('@/assets/lottie/stop.json')
}

export interface MiniGameGoProps {
  state: PendingState
  close: (state: PendingState) => void
}

const MiniGameGo: FC<MiniGameGoProps> = ({ state, close }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const onAnimationFinish = useCallback(() => {
    close(state)
    setLoading(true)
  }, [close, state])

  if (loading)
    return (
      <Component>
        <ActivityIndicator color={Colors.red} />
      </Component>
    )

  return (
    <Component>
      <AnimationContainer alignSelf="center">
        <LottieView
          source={animationsByState[state]}
          onAnimationFinish={onAnimationFinish}
          loop={false}
          autoPlay
        />
      </AnimationContainer>
      {state === 'go' && (
        <StyledTitleWithHashtag
          title="prêts ?"
          titleColor="beige"
          hashtag={['a battre du fer ?']}
          hashtagColor="yellow"
          anchor="right"
          hashtagOffset={{ x: 20, y: 15 }}
          alignSelf="center"
        />
      )}
    </Component>
  )
}

const Component = styled(FullContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.gray};
  z-index: 999;
  align-items: center;
  justify-content: center;
`

const AnimationContainer = styled(Container)`
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
`

const StyledTitleWithHashtag = styled(TitleWithHashtag)`
  transform: translateY(-80px);
`

export default MiniGameGo
