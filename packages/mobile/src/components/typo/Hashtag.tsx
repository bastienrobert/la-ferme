import React, { FC } from 'react'
import { Typo, TypoProps } from '@la-ferme/components/native'

const preset = Typo.presets.TAG

type HashtagParams = 'color' | 'textAlign'
type HashtagProps = Pick<TypoProps, HashtagParams>

const Hashtag: FC<HashtagProps> = ({
  children,
  color = 'gray',
  textAlign = 'left'
}) => {
  return (
    <Typo {...preset} color={color} textAlign={textAlign}>
      {children}
    </Typo>
  )
}

export default Hashtag
