import { RoundChoice } from '@la-ferme/shared/typings'

export default (choice: RoundChoice) => {
  return choice === RoundChoice.Civil
    ? require('@/assets/images/game/pick/civil.png')
    : require('@/assets/images/game/pick/uncivil.png')
}
