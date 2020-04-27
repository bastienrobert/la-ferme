import React, { FC } from 'react'
import { Text, View, Platform } from 'react-native'
import QRCodeScanner, {
  Event as QRCodeScannerEvent
} from 'react-native-qrcode-scanner'

import Container from '@/components/Container'

const Join: FC<any> = () => {
  const onSuccess = (e: QRCodeScannerEvent) => {
    console.log(e.data)
  }

  return (
    <View>
      <Container>
        <QRCodeScanner
          onRead={onSuccess}
          fadeIn={false}
          vibrate={Platform.OS === 'android'}
          topContent={<Text>Scan the QR code.</Text>}
        />
      </Container>
    </View>
  )
}

export default Join
