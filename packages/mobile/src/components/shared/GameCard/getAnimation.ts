import { RoundChoice } from '@la-ferme/shared/typings'

const civil = {
  isabelle: require('@/assets/images/game/choice/animations/civil_isabelle.webp'),
  leon: require('@/assets/images/game/choice/animations/civil_leon.webp'),
  monique: require('@/assets/images/game/choice/animations/civil_monique.webp'),
  peter: require('@/assets/images/game/choice/animations/civil_peter.webp')
}

const civil_malus = {
  isabelle: require('@/assets/images/game/choice/animations/civil_malus_isabelle.webp'),
  leon: require('@/assets/images/game/choice/animations/civil_malus_leon.webp'),
  monique: require('@/assets/images/game/choice/animations/civil_malus_monique.webp'),
  peter: require('@/assets/images/game/choice/animations/civil_malus_peter.webp')
}

const uncivil = {
  isabelle: require('@/assets/images/game/choice/animations/uncivil_isabelle.webp'),
  leon: require('@/assets/images/game/choice/animations/uncivil_leon.webp'),
  monique: require('@/assets/images/game/choice/animations/uncivil_monique.webp'),
  peter: require('@/assets/images/game/choice/animations/uncivil_peter.webp')
}

export interface GetAnimationOptions {
  choice: RoundChoice
  malus: boolean
}

export default (character: string, { choice, malus }: GetAnimationOptions) => {
  return choice === RoundChoice.Uncivil
    ? uncivil[character]
    : malus
    ? civil_malus[character]
    : civil[character]
}
