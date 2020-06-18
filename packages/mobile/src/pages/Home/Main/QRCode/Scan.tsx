import React, { useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'
import styled from 'styled-components/native'
import { Svg, Path } from 'react-native-svg'

import FullContainer from '@/components/shared/FullContainer'
import Title from '@/components/typo/Title'

const Scan = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          delay: 2000,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true
        }),
        Animated.delay(10000)
      ]),
      {
        iterations: -1
      }
    ).start()
  }, [fadeAnim])

  return (
    <Component>
      <Wrapper>
        <StyledSvg fill="none" viewBox="0 0 178 177">
          <Path
            d="M2.518 12.424C2.518 6.656 7.275 2 12.942 2M12.942 174.964c-5.768 0-10.424-4.757-10.424-10.424M175.482 164.438c0 5.769-4.757 10.425-10.424 10.425M164.956 2c5.769 0 10.425 4.757 10.425 10.424"
            stroke="#FEE9D6"
            stroke-width="4"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </StyledSvg>
        <StyledImage
          as={Animated.Image}
          style={{ opacity: fadeAnim }}
          source={require('@/assets/images/qrcode/inside.png')}
        />
      </Wrapper>
      <Title preset="H4" color="beige" textAlign="center">
        Scannez le QR code
      </Title>
    </Component>
  )
}

const Component = styled(FullContainer)`
  flex: 1;
  justify-content: center;
  align-items: center;
  align-self: center;
`

const Wrapper = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  margin-bottom: 40px;
`

const StyledSvg = styled(Svg)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const StyledImage = styled.Image`
  width: 90px;
  height: 90px;
`

export default Scan
