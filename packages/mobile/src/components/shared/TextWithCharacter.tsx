import React, { FC, ReactNodeArray } from 'react'
import { Colors } from '@la-ferme/components/native'
import { global as globalData } from '@la-ferme/shared/data'

import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'
import PlayerWithColor from '@/components/shared/PlayerWithColor'

import templating, { TemplatingNode } from '@/utils/helpers/templating'
import { charactersByName } from '@/utils/helpers/players'

const content = globalData.pronoun

export type TextWithCharacterType = 'title' | 'text'

export interface TextWithCharacterProps {
  text: ReactNodeArray | string
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
  params,
  ...style
}) => {
  const C = typoByType[type]

  return (
    <C color={color} textAlign="center" preset="H5" {...style}>
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
                <C key={index} preset="H5" textAlign="center" color={color}>
                  {find.displayName}
                </C>
              )
            },
            pronoun: index => {
              const find = charactersByName[character]

              return (
                <C key={index} preset="H5" textAlign="center" color={color}>
                  {content[find.gender]}
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
