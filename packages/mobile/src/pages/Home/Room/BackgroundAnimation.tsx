import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

export interface BackgroundAnimationProps {
  owner: boolean
}

const BackgroundAnimation: FC<BackgroundAnimationProps> = ({ owner }) => {
  return owner ? (
    <>
      <PeterReady
        resizeMode={FastImage.resizeMode.contain}
        source={require('@/assets/images/room/animations/ready/peter.webp')}
      />
      {/* <MoniqueReady
        resizeMode={FastImage.resizeMode.contain}
        source={require('@/assets/images/room/animations/ready/monique.webp')}
      /> */}
      {/* <IsabelleReady
        resizeMode={FastImage.resizeMode.contain}
        source={require('@/assets/images/room/animations/ready/isabelle.webp')}
      /> */}
      <LeonReady
        resizeMode={FastImage.resizeMode.contain}
        source={require('@/assets/images/room/animations/ready/leon.webp')}
      />
    </>
  ) : (
    <Dance
      resizeMode={FastImage.resizeMode.contain}
      source={require('@/assets/images/room/animations/dance.webp')}
    />
  )
}

const Dance = styled(FastImage)`
  position: absolute;
  flex: 1;
  bottom: -100px;
  left: 0;
  height: 120%;
  width: 100%;
  z-index: -1;
`

const ReadyAnimation = styled(FastImage)`
  position: absolute;
  width: 300px;
  height: 300px;
  z-index: -1;
`

const PeterReady = styled(ReadyAnimation)`
  bottom: -80px;
`

// const MoniqueReady = styled(ReadyAnimation)`
//   top: 50%;
//   left: 0;
//   transform: translateX(-150px) rotate(90deg);
// `

// const IsabelleReady = styled(ReadyAnimation)`
//   top: 50%;
//   right: 0;
//   transform: translateX(150px) rotate(-90deg);
// `

const LeonReady = styled(ReadyAnimation)`
  top: -80px;
  transform: rotate(180deg);
`

export default BackgroundAnimation
