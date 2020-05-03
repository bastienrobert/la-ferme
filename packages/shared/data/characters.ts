import { Gender, Character } from '../typings'

const characters: Character[] = [
  {
    name: 'monique',
    displayName: 'Monique',
    color: 'pink',
    secondaryColor: 'blue',
    description: '#la vieille bique',
    gender: Gender.FEMALE,
    text:
      'Monique adore prendre son temps. Elle a l’expérience de l’âge mais aussi le caractère qui va avec. Son petit plaisir ? Ruminer au téléphone avec Henriette la biquette la biquette.'
  },
  {
    name: 'leon',
    displayName: 'Léon',
    color: 'blue',
    secondaryColor: 'yellow',
    description: '#la boule de coton',
    gender: Gender.MALE,
    text:
      'Léon est un vrai glouton. Il passe son temps à manger pour rassasier son appetit de loup.'
  },
  {
    name: 'peter',
    displayName: 'Peter',
    color: 'yellow',
    secondaryColor: 'blue',
    description: '#le globe-trotter',
    gender: Gender.MALE,
    text:
      'Pour ne pas devenir chèvre, Peter, le globe trotteur est toujours paré dune boussole et d’une carte sur lui. Prêt pour l’aventure ? '
  },
  {
    name: 'isabelle',
    displayName: 'Isabelle',
    color: 'red',
    secondaryColor: 'yellow',
    description: '#la rebêeellle',
    gender: Gender.FEMALE,
    text:
      'Isabelle n’est pas commode. N’allez pas lui cherchez des poux où elle vous enverra vous faire tondre. Après tout, les béliers sont connus pour leur caractère bien trempé.'
  }
]

export default characters
