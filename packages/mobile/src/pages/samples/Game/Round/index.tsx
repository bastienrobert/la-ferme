import React, { FC } from 'react'
import styled from 'styled-components/native'

import Transition from './Transition'
import Player from './RoundPlayer'
import Viewer from './RoundViewer'
import Container from '@/components/shared/Container'

const Round: FC<any> = ({ data, player, ...rest }) => {
  return (
    <Component>
      <Transition data={data}>
        {d => {
          const C = d.player === player.uuid ? Player : Viewer

          return <C data={d} player={player} {...rest} />
        }}
      </Transition>
    </Component>
  )
}

const Component = styled(Container)`
  position: relative;
  flex: 1;
  margin-top: 30px;
`

export default Round
