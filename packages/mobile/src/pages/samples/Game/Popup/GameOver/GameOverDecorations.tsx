import React, { FC } from 'react'
import styled from 'styled-components/native'

import Container from '@/components/shared/Container'
import Point from '@/components/shared/Point'

const GameOverDecorations: FC = () => {
  return (
    <>
      <CrossImage source={require('@/assets/images/gameover/cross.png')} />
      <LineImage source={require('@/assets/images/gameover/line.png')} />
      <TopPoints>
        <FirstPoint />
        <SecondPoint />
        <ThirdPoint />
      </TopPoints>
      <BottomPoints>
        <FourthPoint />
        <FifthPoint />
        <SixthPoint />
      </BottomPoints>
    </>
  )
}

const CrossImage = styled.Image`
  position: absolute;
  top: 0;
  left: -20px;
  width: 133px;
  transform: rotate(-41deg);
`

const LineImage = styled.Image`
  position: absolute;
  bottom: 0;
  right: -60px;
  width: 136px;
`

const TopPoints = styled(Container)`
  position: absolute;
  top: 70px;
  left: 50%;
`

const FirstPoint = styled(Point)`
  position: absolute;
  top: 0;
  left: 0;
`

const SecondPoint = styled(Point)`
  position: absolute;
  top: 8px;
  left: -22px;
`

const ThirdPoint = styled(Point)`
  position: absolute;
  top: 50px;
  left: 60px;
`

const BottomPoints = styled(Container)`
  position: absolute;
  bottom: 50px;
  left: 35%;
`

const FourthPoint = styled(Point)`
  position: absolute;
  bottom: 0;
  left: 0;
`

const FifthPoint = styled(Point)`
  position: absolute;
  bottom: 56px;
  left: 80px;
`

const SixthPoint = styled(Point)`
  position: absolute;
  bottom: 68px;
  left: 92px;
`

export default GameOverDecorations
