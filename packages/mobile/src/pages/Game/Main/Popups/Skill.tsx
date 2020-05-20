import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { useQuery } from '@apollo/react-hooks'
import { Icon, Colors } from '@la-ferme/components/native'
import { Player as PlayerType } from '@la-ferme/shared/typings'

import { PopupProps } from './'
import Text from '@/components/typo/Text'
import Container from '@/components/shared/Container'
import FullContainer from '@/components/shared/FullContainer'
import PlayerSelect from '@/components/shared/PlayerSelect'

import { getAllExceptCurrent } from '@/utils/helpers/players'

import { LAST_TARGETER_QUERY } from '@/graphql/local'

// get skill
// -> phone: select player and send him as target
// -> happy: just close the popup on OK button and submit
// -> speaker & shepard stick: should register last target data in a store and get it here

const Skill: FC<PopupProps> = ({ set, players, player }) => {
  const [used, setUsed] = useState(false)

  const lastTargeterQuery = useQuery(LAST_TARGETER_QUERY)

  const lastTargeter = lastTargeterQuery?.data
    ? players.find(p => p.uuid === lastTargeterQuery?.data?.targeter)
    : undefined

  console.log('last targeter', lastTargeterQuery?.data)

  const onTargetPress = (target: PlayerType) => {
    setUsed(true)
    console.log(
      'player',
      player.character,
      'want to use',
      player.skill,
      'on target',
      target
    )
    // reportPlayerMutation({
    //   variables: { playerUUID: target.uuid, targetUUID: player.uuid }
    // })
  }

  const onClosePress = () => set(null)

  return (
    <Component>
      {lastTargeter && (
        <Text color="beige">Last targeter was {lastTargeter.character}</Text>
      )}
      {used ? (
        <Text color="beige">Skill has already been used</Text>
      ) : (
        <PlayerSelect
          onPress={onTargetPress}
          players={getAllExceptCurrent(players, player)}
        />
      )}
      <CloseView>
        <CloseContainer>
          <Icon icon="cross" background="red" onPress={onClosePress} />
        </CloseContainer>
      </CloseView>
    </Component>
  )
}

const Component = styled(FullContainer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.gray};
`

const CloseContainer = styled(Container)`
  align-self: center;
`

const CloseView = styled.View`
  margin-bottom: 40px;
  z-index: 2;
`

export default Skill
