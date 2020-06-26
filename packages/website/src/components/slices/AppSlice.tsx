import React, { FC } from 'react'
import styled from 'styled-components'

import Container from '@/components/shared/Container'
import BackgroundColor from '@/components/shared/BackgroundColor'
import Image from '@/components/shared/Image'
import Title from '@/components/typo/Title'

import content from '@/content'
const t = content.app

const AppSlice: FC = () => {
  return (
    <Component id="download">
      <LeftDecoration {...t.images.left} />
      <RightDecoration {...t.images.right} />
      <BackgroundColor color="gray">
        <TextContainer>
          <StyledText color="beige" size="medium">
            <h3>
              {t.text.map(l => (
                <Line>{l}</Line>
              ))}
            </h3>
          </StyledText>
          <QRCode src="/images/app/qrcode.png" />
        </TextContainer>
      </BackgroundColor>
    </Component>
  )
}

const Component = styled.section`
  position: relative;
  min-height: 800px;
  height: 1px;
  margin-top: -100px;
  margin-bottom: 136px;
  overflow: hidden;
`

const TextContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 570px;
  padding-top: 50px;
`

const StyledText = styled(Title)`
  margin-bottom: 40px;
`

const Line = styled.span`
  display: block;
`

const QRCode = styled(Image)`
  width: 230px;
`

const Decoration = styled(Image)`
  position: absolute;
  max-width: 530px;
`

const LeftDecoration = styled(Decoration)`
  top: 5%;
  left: -10px;
  transform: rotate(91deg);
  @media (max-width: 400px) {
    display: none;
  }
`

const RightDecoration = styled(Decoration)`
  bottom: 0;
  right: -10px;
  transform: rotate(-88deg);
  @media (max-width: 400px) {
    display: none;
  }
`

export default AppSlice
