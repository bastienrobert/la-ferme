import React, { FC } from 'react'
import styled from 'styled-components/native'

export interface BackgroundAnimationProps {
  owner: boolean
}

const BackgroundAnimation: FC<BackgroundAnimationProps> = ({ owner }) => {
  return owner ? (
    <>
      <PeterReady
        resizeMode="contain"
        source={require('@/assets/images/room/animations/ready/peter.webp')}
      />
      <MoniqueReady
        resizeMode="contain"
        source={require('@/assets/images/room/animations/ready/monique.webp')}
      />
      {/* <IsabelleReady
        resizeMode="contain"
        source={require('@/assets/images/room/animations/ready/isabelle.webp')}
      />
      <LeonReady
        resizeMode="contain"
        source={require('@/assets/images/room/animations/ready/leon.webp')}
      /> */}
    </>
  ) : (
    <Dance
      resizeMode="contain"
      source={require('@/assets/images/room/animations/dance.webp')}
    />
  )
}

const Dance = styled.Image`
  position: absolute;
  bottom: -100px;
  left: 0;
  width: 100%;
  z-index: -1;
`

const ReadyAnimation = styled.Image`
  position: absolute;
  width: 300px;
  height: 300px;
  z-index: -1;
`

const PeterReady = styled(ReadyAnimation)`
  bottom: 0;
`

const MoniqueReady = styled(ReadyAnimation)`
  top: 50%;
  left: 0;
  transform: translateX(-150px) rotate(90deg);
`

const IsabelleReady = styled(ReadyAnimation)`
  top: 50%;
  right: 0;
  transform: translateX(150px) rotate(-90deg);
`

const LeonReady = styled(ReadyAnimation)`
  top: 0;
  transform: rotate(180deg);
`

export default BackgroundAnimation
