import React, { FC, useEffect, useRef, useMemo } from 'react'
import { Animated, Easing } from 'react-native'
import styled from 'styled-components/native'
import { Player } from '@la-ferme/shared/typings'
import { Colors } from '@la-ferme/components/native'
import { characters } from '@la-ferme/shared/data'

import Container from './Container'
import CircleImage from './CircleImage'
import HeaderTypo from '@/components/typo/Header'

import {
  images as playerImages,
  sortByNameLength
} from '@/utils/helpers/players'
import viewport from '@/services/viewport'

export interface PlayersReadyProps {
  players: Player[]
  onEveryReady?: () => void
}

const PlayersReady: FC<PlayersReadyProps> = ({ players, onEveryReady }) => {
  const translateLine = useRef(
    new Animated.ValueXY({ x: -(viewport.width + 1), y: 0 })
  ).current

  const orderedPlayers = useMemo(() => sortByNameLength(players), [players])

  useEffect(() => {
    if (players.length > 0 && players.every(({ ready }) => ready)) {
      Animated.timing(translateLine, {
        toValue: { x: 0, y: 0 },
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true
      }).start(({ finished }) => {
        if (!finished) return
        onEveryReady && onEveryReady()
      })
    }
  }, [onEveryReady, players, translateLine])

  return (
    <Component>
      <Line
        as={Animated.View}
        style={{ transform: [{ translateX: translateLine.x }] }}
      />
      <IconsWrapper>
        {orderedPlayers.map((p, i) => {
          const character = characters.find(c => p.character === c.name)
          const Image = p.ready ? StyledCircleImageFilled : StyledCircleImage

          return (
            <IconWrapper key={i}>
              <Image
                circle
                background={character.color as Colors.IconBackground}
                source={playerImages[p.character]}
              />
              <NameWrapper>
                <HeaderTypo>{p.character}</HeaderTypo>
              </NameWrapper>
            </IconWrapper>
          )
        })}
      </IconsWrapper>
    </Component>
  )
}

const Component = styled(Container)`
  flex-direction: row;
  align-self: center;
  justify-content: center;
  width: 100%;
  margin-top: 80px;
  margin-bottom: 40px;
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
  width: 70%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
`

const IconWrapper = styled(Container)`
  align-self: center;
`

const NameWrapper = styled(Container)`
  position: absolute;
  top: 0;
  margin-top: -50px;
  margin-left: 30px;
  left: 0;
  width: 120px;
  transform: rotate(-20deg);
`

const StyledCircleImage = styled(CircleImage)`
  width: 60px;
  height: 60px;
  margin: 0 15px;
  border: 4px solid ${Colors.gray};
`

const StyledCircleImageFilled = styled(StyledCircleImage)`
  border: 4px solid ${Colors.beige};
`

export default PlayersReady
