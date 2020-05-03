export default [
  {
    name: 'new-route',
    displayName: 'Nouvel itinéraire',
    text:
      "Monsieur Caramel paraît doux au premier bord. C'est pourtant lui qui a crevé les pneux de tous les velibs de votre station, pour le fun.",
    reward: {
      type: 'turn',
      params: {
        target: 1
      },
      text: "Tournez une case autour d'un joueur"
    }
  },
  {
    name: 'fiesta',
    displayName: 'Fiesta!',
    text:
      "C'est la fièvre du samedi soir chez votre voisinne! Vous montez sur vos grands chevaux et décidez d'appeler la brigade!",
    reward: {
      type: 'backward',
      params: {
        cases: 1,
        target: 1
      },
      text: "Un joueur recule d'une case"
    }
  },
  {
    name: 'on-the-dock',
    displayName: 'Sur le quai',
    text:
      'Chèr(e) voyageur le train rentre à quai gare de Lion. Monsieur Bourguignon ne laisse pas les passagers descendre et force le passage comme un boeuf. Les portes se referment, vous avez raté votre arrêt.',
    reward: {
      type: 'restart',
      text: 'Retour à la case départ'
    }
  }
]
