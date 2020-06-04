import React, { FC, useState, useRef, useCallback } from 'react'
import {
  Animated,
  Easing,
  TouchableWithoutFeedback,
  LayoutRectangle,
  LayoutChangeEvent
} from 'react-native'
import styled from 'styled-components/native'

import FullContainer from './FullContainer'
import Container from './Container'
import Title from '@/components/typo/Title'
import CardPickUp, {
  RATIO as CARD_PICK_UP_RATIO
} from '@/components/cards/pick/up'
import CardPickDown from '@/components/cards/pick/down'

export interface PickCardProps {
  character: string
  onCivilClick: () => void
  onUncivilClick: () => void
}

export enum PickCardType {
  Civil = 1,
  Uncivil
}

const uncivilAnimationSources = {
  isabelle: require('@/assets/images/game/pick/animations/uncivil_isabelle.webp'),
  leon: require('@/assets/images/game/pick/animations/uncivil_leon.webp'),
  monique: require('@/assets/images/game/pick/animations/uncivil_monique.webp'),
  peter: require('@/assets/images/game/pick/animations/uncivil_peter.webp')
}
const civilAnimationSource = require('@/assets/images/game/pick/animations/civil.webp')

const getAnimationSource = (type: PickCardType, character: string) => {
  if (type === PickCardType.Civil) return civilAnimationSource
  else return uncivilAnimationSources[character]
}

const getCardStyle = ({ opacity, translate }) => {
  return {
    opacity,
    transform: [{ translateY: translate.y }, { rotate: '-4.5deg' }]
  }
}

const PickCard: FC<PickCardProps> = ({
  character,
  onCivilClick,
  onUncivilClick
}) => {
  const [animation, setAnimation] = useState<any>()
  const layout = useRef<LayoutRectangle>()
  const youChooseOpacity = useRef(new Animated.Value(0)).current
  const civilCardTranslate = useRef(new Animated.ValueXY()).current
  const uncivilCardTranslate = useRef(new Animated.ValueXY()).current
  const civilCardOpacity = useRef(new Animated.Value(1)).current
  const uncivilCardOpacity = useRef(new Animated.Value(1)).current

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    layout.current = e.nativeEvent.layout
  }, [])

  const onClick = (type: PickCardType) => () => {
    const opacityValue =
      type === PickCardType.Civil ? uncivilCardOpacity : civilCardOpacity
    const translateValue =
      type === PickCardType.Civil ? civilCardTranslate : uncivilCardTranslate

    const height = layout.current.height / 2
    Animated.parallel([
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }),
      Animated.timing(youChooseOpacity, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      }),
      Animated.timing(translateValue, {
        toValue: { x: 0, y: type === PickCardType.Civil ? height : -height },
        duration: 300,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true
      })
    ]).start(({ finished }) => {
      if (!finished) return
      setAnimation(getAnimationSource(type, character))
      if (type === PickCardType.Civil) onCivilClick && onCivilClick()
      else if (type === PickCardType.Uncivil) onUncivilClick && onUncivilClick()
    })
  }

  return (
    <Component>
      <YouChoose
        as={Animated.View}
        alignSelf="center"
        style={{ opacity: youChooseOpacity }}>
        <Title preset="H1" color="beige">
          Vous avez
        </Title>
        <Title preset="H1" color="beige">
          Choisi
        </Title>
      </YouChoose>
      <TouchableWithoutFeedback onPress={onClick(PickCardType.Civil)}>
        <StyledContainer
          as={Animated.View}
          onLayout={onLayout}
          alignSelf="center"
          style={getCardStyle({
            opacity: civilCardOpacity,
            translate: civilCardTranslate
          })}>
          <StyledCard as={CardPickUp} />
          <StyledImage
            resizeMode="contain"
            source={require('@/assets/images/game/pick/civil.png')}
          />
        </StyledContainer>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onClick(PickCardType.Uncivil)}>
        <BottomStyledContainer
          as={Animated.View}
          alignSelf="center"
          style={getCardStyle({
            opacity: uncivilCardOpacity,
            translate: uncivilCardTranslate
          })}>
          <StyledCard as={CardPickDown} />
          <StyledImage
            resizeMode="contain"
            source={require('@/assets/images/game/pick/uncivil.png')}
          />
        </BottomStyledContainer>
      </TouchableWithoutFeedback>
      {animation && <Animation source={animation} resizeMode="contain" />}
    </Component>
  )
}

const Component = styled(FullContainer)`
  elevation: 3;
  align-items: center;
  justify-content: center;
  shadow-opacity: 0.32;
`

const YouChoose = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  align-items: center;
`

const StyledContainer = styled(Container)`
  width: 85%;
  max-width: 400px;
  aspect-ratio: ${CARD_PICK_UP_RATIO};
  box-shadow: 0px 7px 6px #500608;
  margin-top: -0.5px;
`

const BottomStyledContainer = styled(StyledContainer)`
  margin-top: 30px;
  margin-left: 10px;
`

const StyledCard = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const StyledImage = styled.Image`
  flex: 1;
  width: 90%;
  align-self: center;
  justify-content: center;
`

const Animation = styled.Image`
  position: absolute;
  bottom: -20%;
  right: 0;
  width: 90%;
  max-width: 500px;
`

export default PickCard
