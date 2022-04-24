import { Skill } from '../typings'

const skills: Skill[] = [
  {
    name: 'happy',
    displayName: 'Happy',
    description: '#milk',
    text:
      "Vous avez une faim de loup, c'est l'heure de rassasier votre appetit. Au menu ?Un gros Big Meuh.",
    effect: 'Vous pouvez piocher deux cartes pendant un tour !',
    use: 'ce tour-ci vous piochez deux cartes !',
    notificationText:
      'Oh mais c’est ce qu’on appel avoir une faim de loup pour rassasier son appetit de lion.',
    notification:
      '%character% choisit de nouveau une carte coup de boule ou coup de pouce !'
  },
  {
    name: 'speaker',
    displayName: 'Enceinte',
    description: '#bouse',
    text:
      "Musique à fond vous n'entendez même pas le joueur qui manque de vous donner un coup de boule.",
    effect: "Vous annulez l'effet d'une carte contre vous.",
    use: "vous annulez l'effet de la carte de %character% !",
    complete:
      'vous avez annulé l’effet de la carte coup de boule que %character% vous a agressé !',
    notificationText:
      'Musique à fond %character% n’entend même pas l’incivilité dont elle a été victime.',
    notification:
      '%character% annule l’effet de la carte coup de boule qui lui a été adressée !'
  },
  {
    name: 'shepherds-stick',
    displayName: 'Baton',
    description: '#de berger',
    text:
      'Avec votre canne vous faite un croche pate au joueur qui vous a bousculé. C’est ce qu’on appelle un retour de baton !',
    effect:
      'Si un joueur vous adresse une incivilité, elle se retourne contre lui.',
    use: 'vous déjouez le tour de %character% !',
    complete:
      '%character% subit sa carte coup de boule a votre place. Il recule de 2 cases !',
    notificationText:
      'En voulant voulant adresser une incivilité à %character% celle-ci vous a bien plumé.',
    notification: 'Vous subissez votre incivilité à la place de %character% !'
  },
  {
    name: 'cellphone',
    displayName: 'Phone',
    description: '#sony-herisson',
    text:
      "Vous ne pouvez vous empêcher de fouiner dans les affaires des autres en regardant l'écran de vos voisins.",
    effect: 'Vous découvrez le lieu du joueur de votre choix.',
    use: 'vous découvrez le lieu du joueur de votre choix !',
    completeText:
      'Une petit regard indiscret derrière l’épaule et hop vous savez à présent ou se rend le joueur de votre choix.',
    complete: '%character% se rend %goal% !'
  }
]

export default skills
