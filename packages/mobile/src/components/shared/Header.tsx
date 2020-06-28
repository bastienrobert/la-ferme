import React, { FC, useMemo } from 'react'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { Colors } from '@la-ferme/components/native'
import { characters } from '@la-ferme/shared/data'

import Container from './Container'
import CircleImage from './CircleImage'
import Title from '@/components/typo/Title'
import HeaderTypo from '@/components/typo/Header'

import { images as playerImages } from '@/utils/helpers/players'

export interface HeaderProps {
  numberOfRounds: number
  players: Player[]
  player: Player
}

export const MARGIN_TOP = 60

const Header: FC<HeaderProps> = ({ players, player, numberOfRounds = 0 }) => {
  const orderedPlayers = useMemo(() => {
    return players.sort(p => {
      return p.uuid === player.uuid ? -1 : 0
    })
  }, [players, player])

  const roundNumber = numberOfRounds
    ? `${Math.floor((numberOfRounds - 1) / players.length) + 1}`
    : '01'

  return (
    <Component>
      <Line />
      <IconsWrapper>
        {orderedPlayers.map((p, i) => {
          const character = characters.find(c => p.character === c.name)
          const Image = i === 0 ? LargeCircleImage : StyledCircleImage

          return (
            <IconWrapper key={i}>
              <Image
                circle
                background={character.color as Colors.IconBackground}
                source={playerImages[p.character]}
              />
              <NameWrapper large={i === 0}>
                <HeaderTypo>{p.character}</HeaderTypo>
              </NameWrapper>
            </IconWrapper>
          )
        })}
      </IconsWrapper>
      <RoundNumber>
        <NameWrapper>
          <HeaderTypo>Tour</HeaderTypo>
        </NameWrapper>
        <Title preset="H5" color="gray" textAlign="center">
          {roundNumber.padStart(2, '0')}
        </Title>
      </RoundNumber>
    </Component>
  )
}

const Component = styled(Container)`
  flex-direction: row;
  align-self: center;
  justify-content: center;
  width: 100%;
  margin-top: ${MARGIN_TOP}px;
  z-index: 900;
`

const Line = styled(Container)`
  position: absolute;
  width: 100%;
  top: 50%;
  margin-top: -2.5px;
  left: 0;
  height: 5px;
  background-color: ${Colors.beige};
`

const IconsWrapper = styled(Container)`
  width: 85%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  margin-right: -30px;
  margin-left: -30px;
`

const IconWrapper = styled(Container)`
  align-self: center;
`

const NameWrapper = styled<any>(Container)`
  position: absolute;
  top: 0;
  margin-top: -50px;
  margin-left: ${({ large }) => (large ? 20 : 10)}px;
  left: 0;
  width: 120px;
  transform: rotate(-20deg);
`

const StyledCircleImage = styled(CircleImage)`
  width: 30px;
  height: 30px;
  margin-right: 35px;
`

const LargeCircleImage = styled(StyledCircleImage)`
  width: 44px;
  height: 44px;
  border: 4px solid ${Colors.beige};
  margin-right: 22px;
`

const RoundNumber = styled(Container)`
  align-self: center;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  padding-top: 6px;
  padding-left: 2px;
  aspect-ratio: 1;
  border-radius: ${40}px;
  background-color: ${Colors.beige};
`

export default Header
