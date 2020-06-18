import { Card, CardRewardType } from '../../typings'

const uncivil: Card[] = [
  // {
  //   name: 'new-route',
  //   displayName: 'Nouvel itinéraire',
  //   playerText:
  //     "Monsieur Caramel paraît doux au premier bord. C'est pourtant lui qui a crevé les pneux de tous les velibs de votre station, pour le fun.",
  //   viewerText:
  //     "Monsieur Caramel paraît doux au premier bord. C'est pourtant lui qui a crevé les pneux de tous les velibs de votre station, pour le fun.",
  //   reward: {
  //     type: CardRewardType.Turn,
  //     score: -1,
  //     params: {
  //       target: 1
  //     },
  //     text: "Tournez une case autour d'un joueur"
  //   }
  // },
  // {
  //   name: 'fiesta',
  //   displayName: 'Fiesta!',
  //   playerText:
  //     "C'est la fièvre du samedi soir chez votre voisinne! Vous montez sur vos grands chevaux et décidez d'appeler la brigade!",
  //   viewerText:
  //     "C'est la fièvre du samedi soir chez votre voisinne! Vous montez sur vos grands chevaux et décidez d'appeler la brigade!",
  //   reward: {
  //     type: CardRewardType.Backward,
  //     score: -1,
  //     params: {
  //       cases: 1,
  //       target: 1
  //     },
  //     text: "Un joueur recule d'une case"
  //   }
  // },
  // {
  //   name: 'on-the-dock',
  //   displayName: 'Sur le quai',
  //   playerText:
  //     'Chèr(e) voyageur le train rentre à quai gare de Lion. Monsieur Bourguignon ne laisse pas les passagers descendre et force le passage comme un boeuf. Les portes se referment, vous avez raté votre arrêt.',
  //   viewerText:
  //     'Chèr(e) voyageur le train rentre à quai gare de Lion. Monsieur Bourguignon ne laisse pas les passagers descendre et force le passage comme un boeuf. Les portes se referment, vous avez raté votre arrêt.',
  //   reward: {
  //     type: CardRewardType.Restart,
  //     score: -1,
  //     text: 'Retour à la case départ'
  //   }
  // },
  {
    name: 'double-in-the-queue',
    displayName: 'Doubler dans la file d’attente',
    playerText:
      'Monsieur Ponpon est très en retard. Hop! Ni vu ni connu il fait des petits bonds et vous double dans la file du supermarché aux champs.',
    viewerText:
      'Monsieur Ponpon est très en retard. Hop! Ni vu ni connu il fait des petits bonds et vous double dans la file du supermarché aux champs.',
    reward: {
      type: CardRewardType.LoseRound,
      score: -1,
      params: {
        target: 1
      },
      text: 'Un joueur passe son tour'
    }
  }
]

export default uncivil
