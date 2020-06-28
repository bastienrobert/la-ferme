import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { useMutation } from '@apollo/react-hooks'
import { UUID, Player as PlayerType } from '@la-ferme/shared/typings'
import { Colors } from '@la-ferme/components/native'

import CarCounter from './CarCounter'

import MiniGameGoStop from './MiniGameGoStop'
import MiniGameStart from './MiniGameStart'
import MiniGameResults from './MiniGameResults'
import FullContainer from '@/components/shared/FullContainer'

import { SUBMIT_MINI_GAME_MUTATION } from '@/graphql/minigame'

import useTheme from '@/hooks/useTheme'

export interface MiniGameProps {
  uuid: UUID
  close: () => void
  type: string
  player: PlayerType
  players: PlayerType[]
  winner?: UUID
}

export interface InnerGameProps {
  onFinish: (score: number) => void
}

export type PendingState = 'go' | 'stop'

const innerByType = {
  carCounter: CarCounter
}

const MiniGame: FC<MiniGameProps> = props => {
  const { uuid, player, winner, type } = props
  const [pending, setPending] = useState<PendingState>(undefined)
  const [ready, setReady] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()

  const [submitMiniGameMutation] = useMutation(SUBMIT_MINI_GAME_MUTATION)

  useEffect(() => {
    if (winner || theme === 'gray') return
    setTheme('gray')
  }, [winner, setTheme, theme])

  useEffect(() => {
    if (winner) setPending('stop')
    else setTimeout(() => setPending('go'), 6000)
  }, [winner])

  const onGoStopClose = (state: PendingState) => {
    setPending(undefined)
    if (state === 'go') setReady(true)
    if (state === 'stop') {
      setTheme(winner === player.uuid ? 'beige' : 'gray')
    }
  }

  const onFinish = score => {
    if (winner || !uuid) return
    submitMiniGameMutation({
      variables: { playerUUID: player.uuid, miniGameUUID: uuid, score }
    })
  }

  const Inner = winner ? MiniGameResults : innerByType[type]

  const showInner = winner || ready
  const C = winner ? Component : ComponentWithPadding

  if (pending) return <MiniGameGoStop state={pending} close={onGoStopClose} />
  return Inner ? (
    <C style={{ backgroundColor: Colors[theme] }}>
      {showInner ? (
        <Inner onFinish={onFinish} {...props} />
      ) : (
        <MiniGameStart {...props} />
      )}
    </C>
  ) : null
}

const Component = styled(FullContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.gray};
  z-index: 999;
`

const ComponentWithPadding = styled(Component)`
  padding: 50px 0;
`

export default MiniGame
