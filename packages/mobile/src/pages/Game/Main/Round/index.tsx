import React, { FC, useMemo } from 'react'
import {
  UUID,
  Round as RoundType,
  Player as PlayerType,
  Character
} from '@la-ferme/shared/typings'
import styled from 'styled-components/native'

import Player from './Player'
import Spectator from './Spectator'
import Transition, { PushContent } from './Transition'
import { MARGIN_TOP } from '@/components/shared/Header'
import Container from '@/components/shared/Container'

export interface RoundProps {
  data: RoundType
  players: PlayerType[]
  gameUUID: UUID
  player: PlayerType
  character: Character
}

export interface RoundViewProps extends RoundProps {
  forceUpdate: PushContent
}

const Round: FC<RoundProps> = ({ data, ...rest }) => {
  const { character, player } = rest

  const composedData = useMemo(() => {
    return Object.assign(data, {
      background: data.player === player.uuid ? character.color : 'gray'
    })
  }, [data, character.color, player.uuid])

  return (
    <Component>
      <Transition data={composedData} offset={{ y: -MARGIN_TOP }}>
        {(d, forceUpdate) => {
          const isPlayer = d.player === rest.player.uuid
          const C = isPlayer ? Player : Spectator

          return (
            <Wrapper>
              <C data={d} forceUpdate={forceUpdate} {...rest} />
            </Wrapper>
          )
        }}
      </Transition>
    </Component>
  )
}

const Component = styled(Container)`
  width: 100%;
  flex: 1;
`

const Wrapper = styled(Container)`
  width: 100%;
  flex: 1;
  padding-top: 30px;
`

export default Round
