import React, { FC, useMemo } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

import { GameStatisticsParams } from '../'
import StatisticCard, { StatisticCardType } from './StatisticCard'
import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'
import Indicator from '@/components/shared/Indicator'

import useCardSwipe from '@/hooks/useCardSwipe'
import viewport from '@/services/viewport'

export interface StatisticsCardsProps extends GameStatisticsParams {
  onPress: () => void
}

const rotations = [0, 0.5, -1.2]

const StatisticsCards: FC<StatisticsCardsProps> = ({ onPress, ...rest }) => {
  const datas: StatisticCardType[] = useMemo(() => {
    return ['titles', 'player', 'game']
  }, [])

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
      <CardContainer alignSelf="center">
        {datas
          .map((card, i) => {
            if (i < currentIndex) return null
            const cardProps = {
              ...rest,
              type: card,
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
                <StatisticCard onPress={onPress} {...cardProps} />
              </StyledView>
            )
          })
          .reverse()}
      </CardContainer>

      <Indicator
        labels={[
          { number: '01', text: 'titres' },
          { number: '02', text: 'jeu' },
          { number: '03', text: 'partie' }
        ]}
        onLabelPress={onIndicatorPress}
        currentIndex={currentIndex}
      />
    </Component>
  )
}

export default StatisticsCards

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
