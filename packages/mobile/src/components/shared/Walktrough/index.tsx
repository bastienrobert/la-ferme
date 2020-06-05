import React, { FC, useState, useMemo } from 'react'
import { Animated, PanResponder } from 'react-native'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'

import Indicator from '@/components/shared/Indicator'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'

import WalktroughCard, { WalktroughCardProps } from './WalktroughCard'
import viewport from '@/services/viewport'

export interface WalktroughProps {
  player: Player
  onReadyPress: () => void
}

const rotations = [0, 0.5, -1.2]

const Walktrough: FC<any> = ({ onReadyPress, player }) => {
  const datas: WalktroughCardProps[] = useMemo(() => {
    return [
      { name: player.character, type: 'character' },
      { name: player.skill, type: 'skill' },
      { name: player.goal, type: 'goal' }
    ]
  }, [player])

  const [pan] = useState(new Animated.ValueXY())
  const [currentIndex, setIndex] = useState(0)

  const wrapperRotation = pan.x.interpolate({
    inputRange: [-viewport.width / 2, 0, viewport.width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: pan.x,
          dy: pan.y
        }
      ],
      {
        useNativeDriver: false
      }
    ),
    onPanResponderRelease: (_, gestureState) => {
      if (currentIndex >= 0 && currentIndex <= 2) {
        if (gestureState.dx > 120 || gestureState.dx < -120) {
          swipeCard(gestureState, Math.sign(gestureState.dx))
        } else clampToCenter()
      }
    }
  })

  const swipeCard = (gest, dir) => {
    Animated.timing(pan, {
      toValue: { x: (viewport.width + 100) * dir, y: gest.dy },
      duration: 300,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (!finished) return
      pan.setValue({ x: 0, y: 0 })
      setIndex(currentIndex + 1)
    })
  }

  const clampToCenter = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      friction: 6,
      useNativeDriver: true
    }).start()
  }

  const onIndicatorPress = id => {
    pan.setValue({ x: 0, y: 0 })
    setIndex(id)
  }

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
                  {...cardProps}
                />
              </StyledView>
            )
          })
          .reverse()}
      </CardContainer>

      <Indicator
        labels={[
          { number: '01', text: 'perso' },
          { number: '02', text: 'objet' },
          { number: '03', text: 'objectif' }
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
  margin-bottom: 30px;
`

const CardContainer = styled(Container)`
  flex: 1;
  margin-bottom: 20px;
`

const StyledView = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
`
