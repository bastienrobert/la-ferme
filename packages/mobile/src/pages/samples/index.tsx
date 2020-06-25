import React, { useEffect } from 'react'
import { Button } from 'react-native'
import LottieView from 'lottie-react-native'

import TextWithCharacter from '@/components/shared/TextWithCharacter'
import Container from '@/components/shared/Container'

import useTheme from '@/hooks/useTheme'

const Samples = ({ navigation }) => {
  const navigate = route => () => navigation.navigate(route)
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('gray')
  }, [setTheme])

  return (
    <>
      <Button title="Pending" onPress={navigate('Sample:Pending')} />
      <Button title="Game" onPress={navigate('Sample:Game')} />
      <Button title="Notification" onPress={navigate('Sample:Notification')} />
      <Button title="Call" onPress={navigate('Sample:Call')} />
      <Button title="CardChoice" onPress={navigate('Sample:CardChoice')} />
      {/* <TextWithCharacter
        text="Aujourd'hui, Monsieur Lane fait sa tête de mûle et ne veut pas cèder sa place prioritaire. %character% cède sa place à Madame Henriette la biquette et elle le remercie."
        character="leon"
      /> */}
      {/* <LottieView source={require('@/assets/tmp/hello.json')} autoPlay loop /> */}
    </>
  )
}

export default Samples
