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
      <TitleWithHashtag
        title={data.displayName}
        titleColor="gray"
        hashtag={[data.description]}
        hashtagColor="yellow"
        anchor="right"
        hashtagOffset={{ x: 30, y: 15 }}
        alignSelf="center"
      />
    </>
  )
}

const BigImage = styled(FastImage)`
  width: 100%;
  height: 50%;
  margin-bottom: 10px;
`

export default SkillHeader
