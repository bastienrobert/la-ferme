import React, { FC } from 'react'
import { charactersByName } from '@/utils/helpers/players'
import { Colors } from '@la-ferme/components/native'

import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'
import PlayerWithColor from '@/components/shared/PlayerWithColor'

import templating, { TemplatingNode } from '@/utils/helpers/templating'

export type TextWithCharacterType = 'title' | 'text'

export interface TextWithCharacterProps {
  text: ReactNode | string
  character: string
  type?: TextWithCharacterType
  playerColor?: boolean
  color?: Colors.Typo
  params?: { [key: string]: TemplatingNode }
}

const typoByType = {
  title: Title,
  text: Text
}

const TextWithCharacter: FC<TextWithCharacterProps> = ({
  text,
  character,
  type = 'text',
  playerColor = true,
  color = 'gray',
  params
}) => {
  const C = typoByType[type]

  return (
    <C color={color} textAlign="center" preset="H5">
      {templating(
        text,
        Object.assign(
          {
            character: index => {
              if (playerColor) {
                return (
                  <PlayerWithColor
                    key={index}
                    textAlign="center"
                    size="xsmall"
                    character={character}
                  />
                )
              }

              const find = charactersByName[character]
              return (
                <C preset="H5" color={color}>
                  {find.displayName}
                </C>
              )
            }
          },
          params
        )
      )}
    </C>
  )
}

export default TextWithCharacter
