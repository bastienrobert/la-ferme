import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { global as globalData } from '@la-ferme/shared/data'

import { PopupProps } from './'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import SlideToAnswer from '@/components/shared/SlideToAnswer'
import BigCirclesWrapper from '@/components/shared/BigCirclesWrapper'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import useAudio from '@/hooks/useAudio'

const content = globalData.phoneCall

const PhoneCall: FC<PopupProps> = ({ set }) => {
  const [pickedUp, setPickedUp] = useState<boolean>(false)

  const ringtone = useAudio(require('@/assets/audio/ringtone.mp3'), {
    autoPlay: true,
    loop: true
  })

  const onHangUp = () => {
    set(undefined)
  }

  const onPickUp = () => {
    ringtone.current.stop()
    setPickedUp(true)
  }

  return (
    <Component>
      <BigCirclesWrapper alignSelf="center">
        <BigCirclesInner source={require('@/assets/tmp/call.webp')} />
      </BigCirclesWrapper>
      <Wrapper>
        <Container alignSelf="center">
          <Title preset="H1" color="red" textAlign="center">
            {content.title}
          </Title>
          <Text color="beige" textAlign="center">
            {pickedUp ? content.incoming : content.offHook}
          </Text>
        </Container>
      </Wrapper>
      <SlideToAnswer onPickUp={onPickUp} onHangUp={onHangUp} />
    </Component>
  )
}

const Component = styled(FullContainer)`
  padding-bottom: 50px;
`

const BigCirclesInner = styled(FastImage)`
  width: 100%;
  aspect-ratio: 1;
`

const Wrapper = styled(FullContainer)`
  justify-content: center;
`

export default PhoneCall
