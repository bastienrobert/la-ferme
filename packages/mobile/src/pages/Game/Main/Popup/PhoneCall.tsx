import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { global as globalData } from '@la-ferme/shared/data'
import { ReportStatus } from '@la-ferme/shared/typings'

import { PopupProps } from './'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import SlideToAnswer from '@/components/shared/SlideToAnswer'
import BigCirclesWrapper from '@/components/shared/BigCirclesWrapper'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import useAudio from '@/hooks/useAudio'

const content = globalData.phoneCall

const soundByStatus = {
  [ReportStatus.Confirmed]: require('@/assets/audios/call_confirmed.mp3'),
  [ReportStatus.Reversed]: require('@/assets/audios/call_reversed.mp3')
}

const PhoneCall: FC<PopupProps> = ({ set, data }) => {
  const [pickedUp, setPickedUp] = useState<boolean>(false)
  const [touchable, setTouchable] = useState<boolean>(false)

  const [setRingtonePlay] = useAudio(require('@/assets/audios/ringtone.mp3'), {
    autoPlay: true,
    loop: true
  })

  const [setCallPlay] = useAudio(soundByStatus[data.status], {
    autoPlay: false,
    onEnd: () => {
      console.log('END!!')
      setTouchable(true)
    }
  })

  const onHangUp = () => {
    setCallPlay(false)
    set(undefined)
  }

  const onPickUp = () => {
    setRingtonePlay(false)
    setCallPlay(true)
    // setTouchable(false)
    setPickedUp(true)
  }

  return (
    <Component>
      <BigCirclesWrapper background="beige" alignSelf="center">
        <BigCirclesInner
          source={require('@/assets/images/notifications/regularization/penalty.webp')}
        />
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
      <SlideToAnswer
        touchable={touchable}
        onPickUp={onPickUp}
        onHangUp={onHangUp}
      />
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
