import React, { FC, useEffect } from 'react'
import { Platform } from 'react-native'
import styled from 'styled-components/native'
import QRCodeScanner, {
  Event as QRCodeScannerEvent
} from 'react-native-qrcode-scanner'
import { useMutation } from '@apollo/react-hooks'
import { Button } from '@la-ferme/components/native'

import { ROOM_JOIN_MUTATION } from '@/graphql/room'
import { GAME_INFOS_MUTATION } from '@/graphql/local'

import content from '@/content/global.json'

import Scan from './Scan'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'

import auth from '@/services/auth'

const QRCode: FC<any> = ({ navigation }) => {
  const [joinRoom, joinRoomResult] = useMutation(ROOM_JOIN_MUTATION)
  const [setGameInfos, setGameInfosResult] = useMutation(GAME_INFOS_MUTATION)

  useEffect(() => {
    const { data } = joinRoomResult
    if (!data?.joinRoom) return
    const { boxID, playerUUID, gameUUID } = data.joinRoom
    setGameInfos({ variables: { boxID, playerUUID, gameUUID } })
  }, [joinRoomResult, setGameInfos])

  useEffect(() => {
    if (!setGameInfosResult.data) return
    const { data } = joinRoomResult
    navigation.navigate('Home:Room', data.joinRoom)
  }, [navigation, joinRoomResult, setGameInfosResult])

  // TODO: set boxID from NFC tag
  const join = async (boxID: string) => {
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
    navigation.navigate('Home:Main')
  }

  return (
    <Component>
      <CameraContainer>
        <QRCodeScanner
          onRead={onSuccess}
          fadeIn={false}
          vibrate={Platform.OS !== 'android'}
          topViewStyle={TopViewStyle}
          cameraStyle={CameraStyle}
          cameraProps={{ ratio: '1:1' }}
        />
      </CameraContainer>
      <Scan />
      <ButtonView>
        <ButtonContainer>
          <Button variant="primary" onPress={onBackPress}>
            {content.back}
          </Button>
          {/* REMOVE THIS */}
          <Button
            variant="primary"
            onPress={() => join('99719f7a-52a7-4d0e-b794-4caf71c4bcce')}>
            JOIN
          </Button>
        </ButtonContainer>
      </ButtonView>
    </Component>
  )
}

const Component = styled(FullContainer)`
  flex: 1;
`

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
  justify-content: flex-end;
  margin-bottom: 40px;
  z-index: 2;
`

export default QRCode
