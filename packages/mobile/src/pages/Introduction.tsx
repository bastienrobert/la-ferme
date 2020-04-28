import React, { FC, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import styled from 'styled-components/native'
import { Button } from '@la-ferme/components/native'

import content from '@/content/global.json'

import FullView from '@/components/shared/FullView'
import Container from '@/components/shared/Container'
import FullscreenVideo from '@/components/shared/FullscreenVideo'

const Introduction: FC<any> = ({ navigation }) => {
  const [paused, setPaused] = useState(false)

  useFocusEffect(useCallback(() => () => setPaused(true), []))

  const goHome = () => {
    navigation.navigate('Home')
  }

  return (
    <FullView>
      <FullscreenVideo
        paused={paused}
        onEnd={goHome}
        source={{
          uri:
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }}
      />
      <StyledView>
        <StyledContainer>
          <Button variant="primary" onPress={goHome}>
            {content.skip}
          </Button>
        </StyledContainer>
      </StyledView>
    </FullView>
  )
}

const StyledContainer = styled(Container)`
  align-self: center;
`

const StyledView = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 40px;
`

export default Introduction
