import React, { FC, useEffect } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import QRCodeScanner, {
  Event as QRCodeScannerEvent
} from 'react-native-qrcode-scanner'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { Button } from '@la-ferme/components/native'

import { ROOM_JOIN_MUTATION } from '@/graphql/room'

import content from '@/content/global.json'

import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'

import auth from '@/utils/auth'

const QRCode: FC<any> = ({ navigation }) => {
  const client = useApolloClient()
  const [joinRoom, { data }] = useMutation(ROOM_JOIN_MUTATION)

  useEffect(() => {
    if (!data) return
    navigation.navigate('Room', data.joinRoom)
  }, [data, navigation])

  // TODO: set boxID from NFC tag
  const join = async (boxID: string) => {
    client.writeData({ data: { boxID } })
    joinRoom({
      variables: {
        boxID,
        userUUID: auth.uuid
      }
    })
  }

  const onSuccess = (e: QRCodeScannerEvent) => {
    join(e.data)
  }

  const onBackPress = () => {
    navigation.navigate('Home')
  }

  return (
    <FullContainer>
      <CameraContainer>
        <QRCodeScanner
          onRead={onSuccess}
          fadeIn={false}
          vibrate={Platform.OS === 'android'}
          topViewStyle={TopViewStyle}
          cameraStyle={CameraStyle}
          cameraProps={{ ratio: '1:1' }}
        />
      </CameraContainer>
      <ButtonView>
        <ButtonContainer>
          <Button variant="primary" onPress={onBackPress}>
            {content.back}
          </Button>
        </ButtonContainer>
      </ButtonView>
    </FullContainer>
  )
}

const CameraStyle: any = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: '100%',
  flex: 1
}

const TopViewStyle: any = {
  display: 'none'
}

const CameraContainer = styled(Container)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ButtonContainer = styled(Container)`
  align-self: center;
`

const ButtonView = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 40px;
  z-index: 2;
`

export default QRCode
