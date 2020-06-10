import React, { FC, useState } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { Button, Colors } from '@la-ferme/components/native'
import { characters } from '@la-ferme/shared/data'

import Container from './Container'
import CircleImage from './CircleImage'

import { images as playerImages } from '@/utils/helpers/players'

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

  const onButtonPress = () => onPress(data)
  const onCancelPress = () => setData(undefined)

  return (
    <Component>
      <IconsWrapper>
        {players.map((player, i) => {
          const character = characters.find(c => player.character === c.name)

          return (
            <IconWrapper key={i}>
              <CircleImage
                background={character.color as Colors.IconBackground}
                source={playerImages[player.character]}
                onPress={() => onImagePress(player)}
              />
            </IconWrapper>
          )
        })}
      </IconsWrapper>
      {data && (
        <ButtonsWrapper>
          <ButtonWrapper>
            <StyledButton onPress={onButtonPress}>Yep</StyledButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <StyledButton onPress={onCancelPress}>Nope</StyledButton>
          </ButtonWrapper>
        </ButtonsWrapper>
      )}
    </Component>
  )
}

const Component = styled(Container)`
  align-self: center;
  justify-content: center;
  width: 90%;
`

const IconsWrapper = styled(Container)`
  flex-direction: row;
  justify-content: center;
  align-self: stretch;
`

const IconWrapper = styled(Container)`
  margin: 0 20px;
`

const ButtonsWrapper = styled(Container)`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-self: stretch;
`

const ButtonWrapper = styled(Container)`
  width: 45%;
  margin-top: 22px;
  max-width: 200px;
  align-self: stretch;
`

const StyledButton = styled(Button)`
  width: 100%;
`

PlayerSelect.defaultProps = {
  confirmation: false
}

export default PlayerSelect
