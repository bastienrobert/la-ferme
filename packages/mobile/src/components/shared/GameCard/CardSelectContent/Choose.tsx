import React, { FC } from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { Player } from '@la-ferme/shared/typings'

import Container from '@/components/shared/Container'
import PlayerSelect from '@/components/shared/PlayerSelect'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

export interface ChooseProps {
  setPlayer: (player: Player) => void
  players: Player[]
}

const Choose: FC<ChooseProps> = ({ players, setPlayer }) => {
  return (
    <>
      <Description>
        <ScrollView alwaysBounceVertical={false}>
          <Text textAlign="center">
            Aujourd'hui, Monsieur Lane fait sa tête de mûle et ne veut pas cèder
            sa place prioritaire. Vous cedez votre place à Madame Henriette la
            biquette et elle vous remercie.
          </Text>
        </ScrollView>
      </Description>
      <Action alignSelf="center">
        <Title preset="H5" textAlign="center">
          Vous avancez de 2 cases !
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
