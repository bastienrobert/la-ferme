import React, { FC } from 'react'
import { Fonts, Colors } from '@la-ferme/components/native'

import WithHashtag, { WithHashtagProps } from './abstract/WithHashtag'
import Title, { TitlePreset } from '@/components/typo/Title'

export interface TitleWithHashtagProps extends WithHashtagProps {
  title: string
  titleColor: Colors.Typo
  titlePreset?: TitlePreset
  textAlign?: Fonts.TextAlignOption
}

const TitleWithHashtag: FC<TitleWithHashtagProps> = ({
  title,
  titleColor,
  titlePreset = 'H1',
  textAlign = 'center',
  ...props
}) => {
  return (
    <WithHashtag {...props}>
      <Title preset={titlePreset} color={titleColor} textAlign={textAlign}>
        {title}
      </Title>
    </WithHashtag>
  )
}

export default TitleWithHashtag
