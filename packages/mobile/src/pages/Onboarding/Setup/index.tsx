import React, { FC, useContext, useEffect } from 'react'
import styled from 'styled-components/native'
import { Button } from '@la-ferme/components/native'

import ThemeContext from '@/App/Theme/Context'

import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'

const Setup: FC<any> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)

  useEffect(() => {
    setTheme('beige')
  }, [setTheme])

  const onSkipPress = () => {
    navigation.navigate('Onboarding:Role')
  }

  return (
    <Component>
      <Title preset="H3" color="gray">
        Placez vos pions
      </Title>
      <Button onPress={onSkipPress}>Passer</Button>
    </Component>
  )
}

const Component = styled(FullContainer)``

export default Setup
