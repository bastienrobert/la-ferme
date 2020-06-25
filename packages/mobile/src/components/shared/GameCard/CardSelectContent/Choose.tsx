import React, { FC } from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { Card, Player } from '@la-ferme/shared/typings'

import Container from '@/components/shared/Container'
import PlayerSelect from '@/components/shared/PlayerSelect'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export interface ChooseProps {
  card: Card
  players: Player[]
  setPlayer: (player: Player) => void
}

const Choose: FC<ChooseProps> = ({ card, players, setPlayer }) => {
  return (
    <>
      <Description>
        <ScrollView alwaysBounceVertical={false}>
          <Text textAlign="center">{card.playerText}</Text>
        </ScrollView>
      </Description>
      <Action alignSelf="center">
        <Title preset="H5" textAlign="center">
          {card.effect || card.reward.playerText}
        </Title>
      </Action>
      <PlayerSelect onPress={setPlayer} players={players} />
    </>
  )
}

const Description = styled(Container)`
  flex: 1;
  margin-bottom: 15px;
`

const Action = styled(Container)`
  padding-bottom: 10px;
`

export default Choose
