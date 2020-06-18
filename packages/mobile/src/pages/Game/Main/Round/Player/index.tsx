import React, { FC } from 'react'
import { RoundStep } from '@la-ferme/shared/typings'

import New from './New'
import Card from './Card'
import Target from './Target'
import Confirm from './Confirm'
import { RoundViewProps } from '../'

const Player: FC<RoundViewProps> = props => {
  // const [playerSelect, setPlayerSelect] = useState<RoundChoice>(null)
  // const [selectedPlayers, setSelectedPlayers] = useState<PlayerType[]>([])

  // const [setCardRoundMutation] = useMutation(SET_CARD_ROUND_MUTATION)
  // const [completeCardRoundMutation] = useMutation(COMPLETE_CARD_ROUND_MUTATION)

  // const onChoicePress = (choice: RoundChoice, card: CardType) => {
  // card.reward.params?.target
  //   ? setPlayerSelect(choice)
  //   : setCardRoundMutation({
  //       variables: { playerUUID: player.uuid, choice }
  //     })
  // }

  // const onTargetClick = target => {
  //   setSelectedPlayers(selectedPlayers.concat(target))
  // }

  // useEffect(() => {
  //   if (!playerSelect) return
  //   const card = getCard(data.cards[playerSelect])
  //   if (selectedPlayers.length === card.reward.params.target) {
  //     const targets = selectedPlayers.map(p => p.uuid)
  //     setCardRoundMutation({
  //       variables: { playerUUID: player.uuid, choice: playerSelect, targets }
  //     })
  //     setSelectedPlayers([])
  //     setPlayerSelect(null)
  //   }
  // }, [data.cards, playerSelect, player, selectedPlayers, setCardRoundMutation])

  switch (props.data.step) {
    case RoundStep.New:
      return <New {...props} />
    case RoundStep.Card:
      return <Card {...props} />
    // const cards = {
    //   civil: getCard(data.cards.civil),
    //   uncivil: getCard(data.cards.uncivil)
    // }

    // return playerSelect ? (
    //   <Container>
    //     <Text>Selected: {cards[playerSelect].displayName}</Text>
    //     <PlayerSelect
    //       players={getAllExceptCurrent(players, player)}
    //       onPress={onTargetClick}
    //     />
    //   </Container>
    // ) : (
    //   <>
    //     <Container>
    //       <Text>Civil: {cards.civil.displayName}</Text>
    //       <Container>
    //         <Button
    //           onPress={() => onChoicePress(RoundChoice.Civil, cards.civil)}>
    //           Choose civil card
    //         </Button>
    //       </Container>
    //     </Container>
    //     <Container>
    //       <Text>Civil: {cards.uncivil.displayName}</Text>
    //       <Container>
    //         <Button
    //           onPress={() =>
    //             onChoicePress(RoundChoice.Uncivil, cards.uncivil)
    //           }>
    //           Choose uncivil card
    //         </Button>
    //       </Container>
    //     </Container>
    //   </>
    // )
    case RoundStep.Target:
      return <Target {...props} />
    case RoundStep.Confirm:
      return <Confirm {...props} />
    // return (
    //   <Container>
    //     <Text>
    //       Carte choisie: {data.choice} {data.cards[data.choice]}
    //     </Text>
    //     {data.targets?.length > 0 &&
    //       data.targets.map((target, i) => {
    //         const targetedPlayer = players.find(p => p.uuid === target)
    //         return <Text key={i}>Cible(s): {targetedPlayer.character}</Text>
    //       })}
    //     <Container>
    //       <Button onPress={onCompletePress}>OK</Button>
    //     </Container>
    //   </Container>
    // )
    default:
      return null
  }
}

export default Player
