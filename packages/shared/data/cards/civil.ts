import { Card, CardRewardType } from '../../typings'

const civil: Card[] = [
  {
    name: 'get-up',
    displayName: 'Lève-toi!',
    playerText:
      "Aujourd'hui, Monsieur Lane fait sa tête de mûle et ne veut pas cèder sa place prioritaire. Vous cedez votre place à Madame Henriette la biquette et elle vous remercie.",
    viewerText:
      "Aujourd'hui, Monsieur Lane fait sa tête de mûle et ne veut pas cèder sa place prioritaire. %current% cède sa place à Madame Henriette la biquette et elle le remercie.",
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 2
      },
      text: 'Avance de 2 cases !'
    }
  },
  {
    name: 'umbrella',
    displayName: 'Le parapluie',
    playerText:
      'Quel temps de chien! Il pleut des cordes! Mr Fisher ouvre son parapluie sans prendre garde autour de lui. Les baleines de son parapluie piquent, vous changez de trottoir et evitez tout le monde !',
    viewerText: '',
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 1
      },
      text: 'Avance de 1 cases !'
    }
  },
  {
    name: 'waiting-line',
    displayName: "File d'attente",
    playerText:
      'Miss Grisette est futée mais surtout préssée. Ni vu ni connu, elle décide de doubler la file. Vous changez de file pour une qui avance plus vite.',
    viewerText: '',
    reward: {
      type: CardRewardType.SwichPlace,
      score: 1,
      params: {
        target: 1
      },
      text: 'Echangez de place avec un joueur'
    }
  },
  {
    name: 'block-escalators',
    displayName: 'Bloquer les escalators',
    playerText:
      "Monsieur Tartare s'essouffle! Il décide de faire une pause et s'arrête en plein milieu de l'escalator. Aucun moyen de le doubler, vous êtes bloqués.",
    viewerText: '',
    reward: {
      type: CardRewardType.LoseRound,
      score: 1,
      params: {
        self: true
      },
      text: 'Vous passez votre tour'
    }
  }
]

export default civil
