import React, { FC } from 'react'

import Text from '@/components/typo/Text'
import templating from '@/utils/helpers/templating'
import PlayerWithColor from '@/components/shared/PlayerWithColor'

export interface TextWithCurrentPlayerProps {
  text: string
  character: string
}

const TextWithCurrentPlayer: FC<TextWithCurrentPlayerProps> = ({
  text,
  character
}) => {
  return (
    <Text color="beige">
      {templating(text, {
        current: index => {
          return (
            <PlayerWithColor key={index} size="xsmall" character={character} />
          )
        }
      })}
    </Text>
  )
}

export default TextWithCurrentPlayer
