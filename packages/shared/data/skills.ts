import { Skill } from '../typings'

const skills: Skill[] = [
  {
    name: 'happy',
    displayName: 'Happy',
    description: '#Milk',
    text:
      "Vous avez une faim de loup, c'est l'heure de rassasier votre appetit. Au menu ?Un gros Big Meuh.",
    effect: 'Vous pouvez piocher deux cartes pendant un tour !'
  },
  {
    name: 'speaker',
    displayName: 'Enceinte',
    description: '#Bouse',
    text:
      "Musique à fond vous n'entendez même pas le joueur qui manque de vous donner un coup de boule.",
    effect: "Vous annulez l'effet d'une carte contre vous."
  },
  {
    name: 'shepherds-stick',
    displayName: 'Le baton de',
    description: '#Berger',
    text:
      'Avec votre canne vous faite un croche pate au joueur qui vous a bousculé. C’est ce qu’on appelle un retour de baton !',
    effect:
      'Si un joueur vous adresse une incivilité, elle se retourne contre lui.'
  },
  {
    name: 'cellphone',
    displayName: 'Le portable',
    description: '#SoniHérisson',
    text:
      "Vous ne pouvez vous empêcher de fouiner dans les affaires des autres en regardant l'écran de vos voisins.",
    effect: 'Vous découvrez le lieu du joueur de votre choix.'
  }
]

export default skills
