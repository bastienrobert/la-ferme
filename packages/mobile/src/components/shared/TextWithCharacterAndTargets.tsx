import React, { FC } from 'react'
import { Player } from '@la-ferme/shared/typings'

import TextWithCharacter, { TextWithCharacterProps } from './TextWithCharacter'
import PlayerWithColor from './PlayerWithColor'

export interface TextWithCharacterAndTargetsProps
  extends TextWithCharacterProps {
  targets: Player[]
}

const TextWithCharacterAndTargets: FC<TextWithCharacterAndTargetsProps> = ({
  targets,
  ...props
}) => {
  return (
    <TextWithCharacter
      params={{
        targets: index =>
          targets.map((target, i) => (
            <PlayerWithColor
              key={`${index}-${i}`}
              textAlign="center"
              size="xsmall"
              character={target.character}
            />
          ))
      }}
      {...props}
    />
  )
}

export default TextWithCharacterAndTargets
