import React, { FC, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import styled from 'styled-components/native'

import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

const Hello: FC<any> = ({ navigation }) => {
  const progress = useRef(new Animated.Value(0)).current

  useEffect(() => {
    progress.setValue(0)
    Animated.timing(progress, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (!finished) return
      navigation.navigate('Onboarding:Setup')
    })
  }, [navigation, progress])

  return (
    <Component>
      <Title preset="H3" color="beige">
        Vous avez rejoins la partie
      </Title>
      <Text color="beige">
        Vous venez d’arriver à la station Porc Royal. Ici c’est la jungle et les
        gens se comportent comme des animaux. Vous allez devoir vous frayer un
        chemin pour être à l’heure à votre rendez-vous.
      </Text>
    </Component>
  )
}

const Component = styled(FullContainer)``

export default Hello
