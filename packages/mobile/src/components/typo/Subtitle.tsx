import React, { FC } from 'react'

import { Typo, Colors, Fonts } from '@la-ferme/components/native'

export interface SubtitleProps {
  textAlign?: Fonts.TextAlignOption
  color?: Colors.Typo
}

const Subtitle: FC<SubtitleProps> = ({
  children,
  color = 'gray',
  textAlign = 'left'
}) => {
  return (
    <Typo family="bowlby" color={color} size="h4" textAlign={textAlign}>
      {children}
    </Typo>
  )
}

Subtitle.defaultProps = {
  textAlign: 'left',
  color: 'gray'
}

export default Subtitle
