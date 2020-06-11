import React, {
  FC,
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useLayoutEffect
} from 'react'
import { Alert, Platform } from 'react-native'
import styled from 'styled-components/native'
import { RouteProp, NavigationProp } from '@react-navigation/native'
import { useMutation } from '@apollo/react-hooks'
import NfcManager, { NfcEvents } from 'react-native-nfc-manager'

import { RootStackParamList } from '@/App/routes'
import ThemeContext from '@/App/Theme/Context'

import AlertC from '@/components/shared/Alert'
import QRCode from './QRCode'
import AndroidNfcPopup from './AndroidNfcPopup'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'

import { ROOM_JOIN_MUTATION } from '@/graphql/room'
import { GAME_INFOS_MUTATION } from '@/graphql/local'

import auth from '@/services/auth'
import error, { ERRORS } from '@/utils/helpers/error'

const TRANSLATE_NFC_UNSUPPORTED = error(ERRORS.NFC_UNSUPPORTED)

type HomeMainRouteProp = RouteProp<RootStackParamList, 'Home:Main'>
type HomeMainNavigationProp = NavigationProp<RootStackParamList, 'Home:Main'>

export interface HomeMainProps {
  route: HomeMainRouteProp
  navigation: HomeMainNavigationProp
}

const Home: FC<HomeMainProps> = ({ navigation }) => {
  const { setTheme } = useContext(ThemeContext)
  const [QRcode, setQRcode] = useState(false)
  const [androidNfcPopup, setAndroidNfcPopup] = useState(false)
  const isNfcSupported = useRef(false)

  const [joinRoom, joinRoomResult] = useMutation(ROOM_JOIN_MUTATION)
  const [setGameInfos, setGameInfosResult] = useMutation(GAME_INFOS_MUTATION)

  const join = useCallback(
    (boxID: any) => {
      joinRoom({
        variables: {
          boxID,
          userUUID: auth.uuid
        }
      })
    },
    [joinRoom]
  )

  useLayoutEffect(() => {
    setTheme('gray')
  }, [setTheme])

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

  useEffect(() => {
    NfcManager.isSupported().then(supported => {
      isNfcSupported.current = supported

      NfcManager.start()
      NfcManager.setEventListener(NfcEvents.DiscoverTag, boxID => {
        NfcManager.unregisterTagEvent().catch(() => 0)
        join(boxID)
      })
    })

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null)
      NfcManager.unregisterTagEvent().catch(() => 0)
    }
  }, [join])

  const onAndroidNfcPopupCancelPress = useCallback(() => {
    setAndroidNfcPopup(false)
    NfcManager.unregisterTagEvent().catch(() => 0)
  }, [])

  const onQRCodeCancelPress = useCallback(() => {
    setQRcode(false)
  }, [])

  const onNfcIconPress = useCallback(async () => {
    if (!isNfcSupported.current) {
      Alert.alert(TRANSLATE_NFC_UNSUPPORTED)
    }
    if (Platform.OS === 'android') setAndroidNfcPopup(true)

    try {
      await NfcManager.registerTagEvent()
    } catch (err) {
      console.warn(err)
      Alert.alert(TRANSLATE_NFC_UNSUPPORTED)
      onAndroidNfcPopupCancelPress()
    }
  }, [onAndroidNfcPopupCancelPress])

  const onCameraIconPress = useCallback(() => {
    setQRcode(true)
  }, [setQRcode])

  return (
    <Component>
      <AlertC
        title="salut je suis une erreur"
        message="skdfj"
        onPress={() => {}}
      />
      <TitleContainer>
        <Title preset="H1" color="beige" textAlign="center">
          commencer une partie
        </Title>
      </TitleContainer>
      <ImagesWrapper>
        <TouchableImageContainer onPress={onNfcIconPress}>
          <StyledImage source={require('@/assets/images/home/nfc.png')} />
        </TouchableImageContainer>
        <TouchableImageContainer onPress={onCameraIconPress}>
          <StyledImage source={require('@/assets/images/home/qrcode.png')} />
        </TouchableImageContainer>
      </ImagesWrapper>
      <ContentWrapper>
        <Text color="beige" textAlign="center">
          Placez votre téléphone devant le tag NFC de la boite.
        </Text>
        <SpacedOrContainer>
          <Title preset="H3" color="yellow" textAlign="center">
            OU
          </Title>
        </SpacedOrContainer>
        <Text color="beige" textAlign="center">
          Scannez le QR code en ouvrant votre appareil photo.
        </Text>
      </ContentWrapper>
      <QRCode
        onSuccess={join}
        onCancelPress={onQRCodeCancelPress}
        visible={QRcode}
      />
      <AndroidNfcPopup
        onCancelPress={onAndroidNfcPopupCancelPress}
        visible={androidNfcPopup}
      />
    </Component>
  )
}

const Component = styled(FullContainer)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const TitleContainer = styled(Container)`
  width: 100%;
  margin-top: 30px;
`

const ImagesWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const TouchableImageContainer = styled.TouchableOpacity`
  width: 50%;
  max-width: 200px;
`

const StyledImage = styled.Image`
  width: 100%;
`

const ContentWrapper = styled.View`
  flex: 1;
  width: 70%;
  max-width: 500px;
  align-items: center;
  justify-content: center;
`

const SpacedOrContainer = styled(Container)`
  margin: 30px 0;
  width: 100%;
`

export default Home
