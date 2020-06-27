import React, { FC } from 'react'
import styled, { ThemedCssFunction } from 'styled-components'

import Image, { ImageProps } from '@/components/shared/Image'
import Subtitle from '@/components/typo/Subtitle'

import content from '@/content'
const t = content.posters

export interface PosterProps extends ImageProps {
  featured?: boolean
  extraStyle: ThemedCssFunction<any>
}

const Featured: FC = () => {
  return (
    <StyledFeatured>
      <Arrow />
      <ArrowTextContainer>
        {t.arrow.map((l, i) => (
          <Subtitle key={i} color="red">
            <Line>{l}</Line>
          </Subtitle>
        ))}
      </ArrowTextContainer>
    </StyledFeatured>
  )
}

const Poster: FC<PosterProps> = ({ src, alt, featured, ...props }) => {
  return (
    <Component {...props}>
      <StyledImage src={src} alt={alt} />
      {featured && <Featured />}
    </Component>
  )
}

const Component = styled.div<any>`
  position: relative;
  width: 400px;
  max-width: 100%;
  ${({ extraStyle }) => extraStyle}
`

const StyledImage = styled(Image)`
  width: 100%;
`

const StyledFeatured = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  transform: translate(100%, 100%);
`

const Arrow = styled.span`
  display: block;
  width: 81px;
  height: 73px;
  background-image: url('/images/posters/arrow.png');
`

const ArrowTextContainer = styled.span`
  margin-top: 35px;
  margin-left: 10px;
  transform: rotate(-2deg);
`

const Line = styled.span`
  display: block;
`

export default Poster
