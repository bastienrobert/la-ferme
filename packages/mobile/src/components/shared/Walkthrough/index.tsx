import React, { FC, useState } from 'react'
import { Button } from '@la-ferme/components/native'
import { Animated, PanResponder } from 'react-native'

import styled from 'styled-components/native'

import Navigation from '@/components/shared/Navigation'

import FullContainer from '@/components/shared/FullContainer'
import Container from '@/components/shared/Container'

import WalkthroughCard from './WalkthroughCard'
import viewport from '@/services/viewport'

const Walkthrough: FC<any> = ({ data, onReadyPress }) => {
  const datas = [data.character, data.skill, data.goal]

  const [pan, setPan] = useState(new Animated.ValueXY())
  const [currentIndex, setIndex] = useState(0)
  const [fadeAnim] = useState(new Animated.Value(0))

  const rotate = pan.x.interpolate({
    inputRange: [-viewport.width / 2, 0, viewport.width / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  })

  const opacity = pan.x.interpolate({
    inputRange: [-viewport.width, 0, viewport.width],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp'
  })

  const cardStyle = {
    transform: [
      {
        rotate: rotate
      },
      ...pan.getTranslateTransform()
    ],
    opacity: opacity
  }

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
          setPan(new Animated.ValueXY())
          setActiveButton(currentIndex + 1)
        } else {
          clampToCenter()
        }
      }
    }
  })

  const swipeCard = (gest, dir) => {
    Animated.spring(pan, {
      toValue: { x: (viewport.width + 100) * dir, y: gest.dy },
      useNativeDriver: true
    }).start(() => {
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

  const changeCard = cardId => {
    setIndex(cardId)
  }

  return (
    <CardContainer>
      {datas
        .map((card, i) => {
          if (i < currentIndex) {
            return null
          } else if (i === currentIndex && i !== datas.length - 1) {
            return (
              <StyledView
                key={i}
                as={Animated.View}
                style={cardStyle}
                {...panResponder.panHandlers}>
                <WalkthroughCard data={card} />
              </StyledView>
            )
          } else {
            if (currentIndex === datas.length - 1) {
              Animated.timing(fadeAnim, {
                toValue: 1,
                useNativeDriver: true
              }).start()

              return (
                <StyledView key={i}>
                  <WalkthroughCard data={card} />
                  <Component as={Animated.View} style={{ opacity: fadeAnim }}>
                    <Button variant="secondary" onPress={onReadyPress}>
                      PRÊÊÊÊT
                    </Button>
                  </Component>
                </StyledView>
              )
            } else {
              return (
                <StyledView key={i}>
                  <WalkthroughCard data={card} />
                </StyledView>
              )
            }
          }
        })
        .reverse()}

      <Navigation
        changeCard={changeCard}
        currentIndex={currentIndex}
        titles={['01 PERSO', '02 OBJET', 'O3 OBJECTIF']}
      />
    </CardContainer>
  )
}

export default Walkthrough

const random = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const CardContainer = styled(FullContainer)`
  height: ${viewport.height}px;
  width: ${viewport.width}px;
  flex: 1;
`

const Component = styled(Container)`
  display: flex;
  margin: 10px auto 35%;
`

const StyledView = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  transform: rotate(${random(-2, 3)}deg);
`
