import React, { FC } from 'react'
import styled from 'styled-components'

import Container from '@/components/shared/Container'
import TitleAndSmallText from '@/components/shared/TitleAndSmallText'
import BackgroundColor from '@/components/shared/BackgroundColor'
import Image from '@/components/shared/Image'
import Point from '@/components/shared/Point'
import Title from '@/components/typo/Title'

import content from '@/content'
const t = content.goal

const GoalSlice: FC = () => {
  return (
    <Component>
      <StyledBackgroundColor color="red">
        <StyledContainer>
          <Wrapper>
            <StyledTitleAndSmallText title={t.title} small={t.small} />
            <p>
              {t.subtitle.map(l => (
                <Title color="beige" size="medium">
                  <Line>{l}</Line>
                </Title>
              ))}
            </p>
            <StyledPoint />
            <SecondPoint />
          </Wrapper>
          <LeftDecoration {...t.images.left} />
          <RightDecoration {...t.images.right} />
        </StyledContainer>
      </StyledBackgroundColor>
    </Component>
  )
}

const Component = styled.section`
  min-height: 600px;
  height: 1px;
`

const StyledBackgroundColor = styled(BackgroundColor)`
  display: flex;
  align-items: center;
`

const StyledTitleAndSmallText = styled(TitleAndSmallText)`
  margin-bottom: 150px;
`

const StyledContainer = styled(Container)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  position: relative;
`

const Line = styled.span`
  display: block;
  @media (max-width: 600px) {
    font-size: 24px;
  }
`

const LeftDecoration = styled(Image)`
  position: absolute;
  width: 157px;
  top: -40px;
  left: -60px;
  @media (max-width: 600px) {
    width: 80px;
    left: -20px;
  }
`

const RightDecoration = styled(Image)`
  position: absolute;
  width: 111px;
  bottom: -40px;
  right: -20px;
  @media (max-width: 600px) {
    width: 55px;
  }
`

const StyledPoint = styled(Point)`
  position: absolute;
  top: -100px;
  right: 50px;
`

const SecondPoint = styled(StyledPoint)`
  transform: translate(20px, 10px);
`

export default GoalSlice
