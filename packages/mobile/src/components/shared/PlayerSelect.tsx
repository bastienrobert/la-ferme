import React, { FC, useState } from 'react'
import { Player } from '@la-ferme/shared/typings'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import Text from '@/components/typo/Text'
import CircleImage from '@/components/shared/CircleImage'

export interface PlayerSelectProps {
  players: Player[]
  onPress: (player: Player) => void
  confirmation?: boolean
}

const PlayerSelect: FC<PlayerSelectProps> = ({
  players,
  confirmation,
  onPress
}) => {
  const [data, setData] = useState<Player>()

  const onImagePress = (player: Player) => {
    if (confirmation) setData(player)
    else onPress(player)
  }

  const onButtonPress = () => {
    onPress(data)
  }

  return (
    <Container>
      {players.map((player, i) => {
        return (
          <>
            <Text color="beige">{player.character}</Text>
            <CircleImage
              key={i}
              source={require('@/assets/tmp/leon_icone.png')}
              onPress={() => onImagePress(player)}
            />
          </>
        )
      })}
      {confirmation && <Button onPress={onButtonPress} />}
    </Container>
  )
}

PlayerSelect.defaultProps = {
  confirmation: false
}

export default PlayerSelect
