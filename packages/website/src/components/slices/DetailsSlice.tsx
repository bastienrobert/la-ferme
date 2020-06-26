import React, { FC } from 'react'
import styled from 'styled-components'

import Container from '@/components/shared/Container'
import Image from '@/components/shared/Image'
import TitleAndSubtitle from '@/components/shared/TitleAndSubtitle'
import Text from '@/components/typo/Text'

import content from '@/content'
const t = content.details

interface ColumnProps {
  paragraphs: string[]
}

const Column: FC<ColumnProps> = ({ paragraphs }) => {
  return (
    <StyledColumn>
      {paragraphs.map(p => (
        <Paragraph>
          <p>{p}</p>
        </Paragraph>
      ))}
    </StyledColumn>
  )
}

const DetailsSlice: FC = () => {
  return (
    <Component as="section" id="project">
      <Wrapper>
        <TitleAndSubtitle title={t.title} subtitle={t.subtitle} />
      </Wrapper>
      <TextContainer>
        <EvilImage {...t.images.evil} />
        <HeartEyesImage {...t.images.heart_eyes} />
        <Wrapper>
          <Columns>
            <Column paragraphs={t.left} />
            <Column paragraphs={t.right} />
          </Columns>
        </Wrapper>
      </TextContainer>
    </Component>
  )
}

const Component = styled(Container)`
  padding-top: 40px;
  margin-bottom: 108px;
`

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const TextContainer = styled.div`
  position: relative;
`

const Columns = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`

const StyledColumn = styled.div`
  flex: 1;
  max-width: 320px;
  min-width: 200px;
`

const Paragraph = styled(Text)`
  margin-bottom: 20px;
`

const EvilImage = styled(Image)`
  position: absolute;
  top: -100px;
  right: -100px;
  width: 200px;
  @media (max-width: 400px) {
    display: none;
  }
`

const HeartEyesImage = styled(Image)`
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 170px;
  @media (max-width: 400px) {
    display: none;
  }
`

export default DetailsSlice
