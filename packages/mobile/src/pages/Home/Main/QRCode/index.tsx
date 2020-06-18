import React, { FC } from 'react'
import { Animated, Platform } from 'react-native'
import styled from 'styled-components/native'
import QRCodeScanner, {
  Event as QRCodeScannerEvent
} from 'react-native-qrcode-scanner'
import { Colors, Button } from '@la-ferme/components/native'

import { global as globalData } from '@la-ferme/shared/data'

import Scan from './Scan'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'

export const content = globalData.general

export interface QRCodeProps {
  onSuccess: (boxID: any) => void
  onCancelPress: () => void
}

const QRCode: FC<QRCodeProps> = ({ onSuccess, onCancelPress }) => {
  const onRead = (e: QRCodeScannerEvent) => {
    onSuccess(e.data)
  }

  return (
    <Component as={Animated.View}>
      <CameraContainer>
        <QRCodeScanner
          onRead={onRead}
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
          <Button variant="primary" onPress={onCancelPress}>
            {content.back}
          </Button>
          {/* REMOVE THIS */}
          <Button
            variant="primary"
            onPress={() => onSuccess('99719f7a-52a7-4d0e-b794-4caf71c4bcce')}>
            JOIN
          </Button>
        </ButtonContainer>
      </ButtonView>
    </Component>
  )
}

const Component = styled(FullContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex: 1;
  background-color: ${Colors.gray};
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
