import React, { FC, useMemo } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { global as globalData } from '@la-ferme/shared/data'

import WalktroughCard, { WalktroughCardData } from './WalktroughCard'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Indicator from '@/components/shared/Indicator'

import useCardSwipe from '@/hooks/useCardSwipe'
import viewport from '@/services/viewport'

export const content = globalData.role

export interface WalktroughProps {
  player: Player
  onReadyPress: () => void
}

const rotations = [0, 0.5, -1.2]

const Walktrough: FC<any> = ({ onReadyPress, player }) => {
  const datas: WalktroughCardData[] = useMemo(() => {
    return [
      { name: player.character, type: 'character' },
      { name: player.skill, type: 'skill' },
      { name: player.goal, type: 'goal' }
    ]
  }, [player])

  const { pan, setIndex, currentIndex, panResponder } = useCardSwipe()

  const onIndicatorPress = id => {
    pan.setValue({ x: 0, y: 0 })
    setIndex(id)
  }

  const wrapperRotation = pan.x.interpolate({
    inputRange: [-viewport.width / 2, 0, viewport.width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })

  const wrapperStyle = {
    transform: [
      {
        rotate: wrapperRotation
      },
      ...pan.getTranslateTransform()
    ]
  }

  return (
    <Component>
      <CardContainer>
        {datas
          .map((card, i) => {
            if (i < currentIndex) return null
            const cardProps = {
              ...card,
              style: { transform: [{ rotate: rotations[i] + 'deg' }] }
            }

            const last = i === datas.length - 1
            const props = last ? {} : { ...panResponder.panHandlers }

            return (
              <StyledView
                key={i}
                as={Animated.View}
                style={i === currentIndex ? wrapperStyle : {}}
                {...props}>
                <WalktroughCard
                  onPress={last ? onReadyPress : null}
                  player={player}
                  {...cardProps}
                />
              </StyledView>
            )
          })
          .reverse()}
      </CardContainer>

      <Indicator
        labels={[
          { number: '01', text: content.character_indicator },
          { number: '02', text: content.skill_indicator },
          { number: '03', text: content.goal_indicator }
        ]}
        onLabelPress={onIndicatorPress}
        currentIndex={currentIndex}
      />
    </Component>
  )
}

export default Walktrough

const Component = styled(FullContainer)`
  flex: 1;
  padding-top: 10px;
  padding-bottom: 20px;
`

const CardContainer = styled(Container)`
  flex: 1;
  height: 100%;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
`

const StyledView = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
