import React, { FC } from 'react'
import { Colors } from '@la-ferme/components/native'

import PlayerWithColor, { PlayerWithColorProps } from './PlayerWithColor'
import WithHashtag, { WithHashtagProps } from './abstract/WithHashtag'

import { complementaries } from '@/utils/colors'
import { charactersByName } from '@/utils/helpers/players'

type WithHashtagPropsOmited = Omit<WithHashtagProps, 'hashtag' | 'hashtagColor'>
export type PlayerWithHashtagProps = WithHashtagPropsOmited &
  PlayerWithColorProps

const PlayerWithHashtag: FC<PlayerWithHashtagProps> = ({
  character,
  size,
  ...props
}) => {
  const find = charactersByName[character]

  return (
    <WithHashtag
      hashtag={[find.description]}
      hashtagColor={complementaries[find.color]}
      {...props}>
      <PlayerWithColor
        _color={find.color as Colors.Typo}
        _displayName={find.displayName}
        character={character}
        size={size}
      />
    </WithHashtag>
  )
}

export default PlayerWithHashtag
