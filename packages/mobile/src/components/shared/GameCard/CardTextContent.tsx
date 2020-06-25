import React, { FC, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { ScrollView } from 'react-native'
import { Card, Player } from '@la-ferme/shared/typings'
import { global as globalData } from '@la-ferme/shared/data'
import { Button } from '@la-ferme/components/native'

import Container from '@/components/shared/Container'
import TextWithCharacter from '@/components/shared/TextWithCharacter'
import TextWithCharacterAndTargets from '@/components/shared/TextWithCharacterAndTargets'
import Title from '@/components/typo/Title'
import Text from '@/components/typo/Text'

import { charactersByName } from '@/utils/helpers/players'

const content = globalData.gameCard

export interface CardTextContentProps {
  card: Card
  player: Player
  targets: Player[]
  self: boolean
  onPress?: () => void
}

const CardTextContent: FC<CardTextContentProps> = ({
  self,
  player,
  targets,
  card,
  onPress
}) => {
  const [disabled, setDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (!onPress || !disabled) return
    setTimeout(() => {
      setDisabled(false)
    }, 4000)
  }, [disabled, onPress])

  return (
    <Container alignSelf="center">
      <Description>
        <ScrollView alwaysBounceVertical={false}>
          {self ? (
            <Text color="gray" textAlign="center">
              {card.playerText}
            </Text>
          ) : (
            <TextWithCharacter
              type="text"
              text={card.viewerText}
              playerColor={false}
              character={player.character}
            />
          )}
        </ScrollView>
      </Description>
      <Action alignSelf="center">
        <TextWithCharacterAndTargets
          type="title"
          text={self ? card.reward.playerText : card.reward.viewerText}
          character={player.character}
          targets={targets}
        />
      </Action>
      {onPress && (
        <Container alignSelf="center">
          <Button variant="secondary" disabled={disabled} onPress={onPress}>
            {content.cta_ok}
          </Button>
        </Container>
      )}
    </Container>
  )
}

const Description = styled(Container)`
  flex: 1;
  margin-bottom: 15px;
`

const Action = styled(Container)`
  padding-bottom: 10px;
`

export default CardTextContent
