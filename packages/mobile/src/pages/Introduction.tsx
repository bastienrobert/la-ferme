import React, { FC, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import styled from 'styled-components/native'
import { Button } from '@la-ferme/components/native'

import content from '@/content/global.json'

import FullView from '@/components/FullView'
import Container from '@/components/Container'
import FullscreenVideo from '@/components/FullscreenVideo'

const Introduction: FC<any> = ({ navigation }) => {
  const [paused, setPaused] = useState(false)

  useFocusEffect(
    useCallback(() => {
      return () => setPaused(true)
    }, [])
  )

  const onSkipPress = () => {
    navigation.navigate('Home')
  }

  return (
    <FullView>
      <FullscreenVideo
        paused={paused}
        source={{
          uri:
            'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4'
        }}
      />
      <StyledView>
        <StyledContainer>
          <Button variant="primary" onPress={onSkipPress}>
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
