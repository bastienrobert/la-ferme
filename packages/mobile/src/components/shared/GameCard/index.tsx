import React, { FC } from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'
import { global as globalData } from '@la-ferme/shared/data'
import { getCard } from '@la-ferme/shared/data/cards'
import { Player, RoundChoice } from '@la-ferme/shared/typings'

import CardTextContent from './CardTextContent'
import CardSelectContent from './CardSelectContent'
import Container, { ContainerProps } from '@/components/shared/Container'
import Title from '@/components/typo/Title'
import PlayerWithColor from '@/components/shared/PlayerWithColor'

import CardGameUp, {
  RATIO as CARD_GAME_UP_RATIO
} from '@/components/cards/game/up'
import CardGameDown, {
  RATIO as CARD_GAME_DOWN_RATIO
} from '@/components/cards/game/down'

import getBackgroundImage from './getBackgroundImage'
import getAnimation from './getAnimation'
import { shadow, inner } from '@/components/cards/cards.style'
import { getAllExceptCurrent } from '@/utils/helpers/players'

export const content = globalData.gameCard

export interface GameCardProps extends ContainerProps {
  name: string
  choice: RoundChoice
  player: Player
  players: Player[]
  type: GameCardType
  targets?: Player[]
  onPress?: () => void
  onPlayerSelect?: (player: Player) => void
}

export enum GameCardType {
  Spectator = 1,
  Select,
  Confirm
}

const GameCard: FC<GameCardProps> = ({
  name,
  choice,
  player,
  players,
  targets,
  type,
  onPress,
  onPlayerSelect,
  ...props
}) => {
  const card = getCard(name)
  const self = type !== GameCardType.Spectator

  return (
    <Component {...props}>
      <TopStyledContainer style={{ aspectRatio: CARD_GAME_UP_RATIO }}>
        <StyledCard as={CardGameUp} />
        <BigImage
          source={getAnimation(player.character, { choice, malus: false })}
          resizeMode={FastImage.resizeMode.contain}
        />
        <BackgroundImage
          source={getBackgroundImage(choice)}
          resizeMode={FastImage.resizeMode.contain}
        />
        <TopInner>
          <TitleContainer>
            {!self && (
              <PlayerWithColor size="small" character={player.character} />
            )}
            <Title preset="H3">{self ? content.choice : content.choosed}</Title>
          </TitleContainer>
        </TopInner>
      </TopStyledContainer>
      <BottomStyledContainer style={{ aspectRatio: CARD_GAME_DOWN_RATIO }}>
        <StyledCard as={CardGameDown} />
        <BottomInner>
          {type === GameCardType.Select ? (
            <CardSelectContent
              card={card}
              players={getAllExceptCurrent(players, player)}
              onPress={onPlayerSelect}
            />
          ) : (
            <CardTextContent
              card={card}
              self={self}
              player={player}
              targets={targets}
              onPress={onPress}
            />
          )}
        </BottomInner>
      </BottomStyledContainer>
    </Component>
  )
}

export default GameCard

const Component = styled(Container)`
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  aspect-ratio: ${352 / 629};
`

const BigImage = styled(FastImage)`
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  transform: scale(1.2);
`

const BackgroundImage = styled(FastImage)`
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  height: 100%;
  z-index: 0;
`

const TopStyledContainer = styled(Container)`
  width: 100%;
`

const TopInner = styled(Container)`
  ${inner}
  padding: 43px 12px;
`

const TitleContainer = styled(Container)`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`

const BottomInner = styled(Container)`
  ${inner}
  padding: 28px 26px;
`

const BottomStyledContainer = styled(Container)`
  margin-top: -1px;
  width: 100%;
`

const StyledCard = styled(Container)`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  ${shadow}
`
