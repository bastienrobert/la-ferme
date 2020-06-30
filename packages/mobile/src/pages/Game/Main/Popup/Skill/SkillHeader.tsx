import React, { FC } from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'
import { Goal, Skill } from '@la-ferme/shared/typings'

import TitleWithHashtag from '@/components/shared/TitleWithHashtag'

export interface SkillHeaderProps {
  data: Goal | Skill
  image: any
}

const SkillHeader: FC<SkillHeaderProps> = ({ data, image }) => {
  return (
    <>
      <BigImage source={image} resizeMode={FastImage.resizeMode.contain} />
      <StyledTitleWithHashtag
        title={data.displayName}
        titleColor="gray"
        hashtag={[data.description]}
        hashtagColor="yellow"
        anchor="right"
        hashtagOffset={{ x: 30, y: 5 }}
        alignSelf="center"
      />
    </>
  )
}

const BigImage = styled(FastImage)`
  width: 100%;
  max-height: 50%;
  min-height: 200px;
  margin-bottom: 5px;
  flex: 1;
`

const StyledTitleWithHashtag = styled(TitleWithHashtag)`
  margin-bottom: 15px;
`

export default SkillHeader
