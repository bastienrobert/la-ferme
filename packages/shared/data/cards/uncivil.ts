import { Card, CardRewardType } from '../../typings'

const uncivil: Card[] = [
  {
    name: 'not-polite',
    displayName: 'Pas aimable...',
    playerText:
      'Quelle peau de vache ! Madame Kirry ne se lêve pas du strapontin et vous empêche de rentrer dans le métro.',
    viewerText:
      'Quelle peau de vache ! Madame Kirry ne se lêve pas du strapontin et empêche %character% de rentrer dans le métro.',
    effect: "Faites reculer un joueur d'une case !",
    reward: {
      type: CardRewardType.Backward,
      score: -1,
      params: {
        target: 1,
        cases: 1
      },
      playerText: "Vous faites reculer un joueur d'une case !",
      viewerText: "%character% fait reculer %targets% d'une case !"
    }
  },
  {
    name: 'smart-bill',
    displayName: 'Habille, Bill',
    playerText:
      'Monsieur Ponpon est très en retard. Hop! Ni vu ni connu il double tout le monde dans la file aux champs.',
    viewerText:
      'Monsieur Ponpon est très en retard. Hop! Ni vu ni connu il double tout le monde dans la file aux champs.',
    effect: 'Faites passer un tour à un joueur !',
    reward: {
      type: CardRewardType.LoseRound,
      score: -1,
      params: {
        target: 1
      },
      playerText: 'Vous faites passer un tour à %targets% !',
      viewerText: '%character% fait passer un tour à %targets% !'
    }
  },
  {
    name: 'damn-door',
    displayName: 'Sacré porte',
    playerText:
      'Madame Potté oublie de vous tenir la porte, quelle tête de linotte ! Cela entraine une prise de bec.',
    viewerText:
      'Madame Potté oublie de tenir la porte à %character%, quelle tête de linotte ! Cela entraine une prise de bec.',
    effect: "Faites reculer un joueur d'une case !",
    reward: {
      type: CardRewardType.Backward,
      score: -1,
      params: {
        target: 1,
        cases: 1
      },
      playerText: "Vous faites reculer %targets% d'une case !",
      viewerText: "%character% fait reculer %targets% d'une case !"
    }
  },
  {
    name: 'stay-here',
    displayName: 'Reste ici',
    playerText:
      'Monsieur Bourguignon ne laisse personne descendre. Les portes se referment, vous avez raté votre arrêt.',
    viewerText:
      'Monsieur Bourguignon ne laisse personne descendre. Les portes se referment, %character% rate son arrêt.',
    effect: 'Un joueur retourne à la case départ !',
    reward: {
      type: CardRewardType.Restart,
      score: -2,
      params: {
        target: 1
      },
      playerText: '%targets% retourne à la case départ !',
      viewerText: '%targets% retourne à la case départ !'
    }
  },
  {
    name: 'jostle',
    displayName: 'Bousculade',
    playerText:
      'Aussi jolie soit-elle, Madame Burrata est très impolie. Elle vous bouscule et vous tombez sur un passant. ',
    viewerText:
      'Aussi jolie soit-elle, Madame Burrata est très impolie. Elle bouscule %character% qui tombe sur un passant. ',
    effect: 'Faites reculer un joueur de 2 cases !',
    reward: {
      type: CardRewardType.Backward,
      score: -1,
      params: {
        target: 1,
        cases: 2
      },
      playerText: 'Vous faites reculer %targets% de 2 cases !',
      viewerText: '%character% fait reculer %targets% de 2 cases !'
    }
  },
  {
    name: 'stuck',
    displayName: 'Coincé!',
    playerText:
      "Votre patte est coincée!! Remerciez Monsieur Joe Jumper de s'être adosser à la barre du métro sans gêne.",
    viewerText:
      "La patte de %character% est coincée!! Remerciez Monsieur Joe Jumper de s'adosser à la barre du métro sans gêne.",
    effect: "Faites reculer un joueur d'une case !",
    reward: {
      type: CardRewardType.Backward,
      score: -1,
      params: {
        target: 1,
        cases: 1
      },
      playerText: "Vous faites reculer %targets% d'une case !",
      viewerText: "%character% fait reculer %targets% d'une case !"
    }
  },
  {
    name: 'stinky-mattress',
    displayName: 'Matelas puant',
    playerText:
      "Un matelas pourri encombre l'ascenseur. Vous devez prendre l'escalier.",
    viewerText:
      "Un matelas pourri encombre l'ascenseur. %character% doit prendre l'escalier.",
    effect: 'Faites passer un tour à un joueur !',
    reward: {
      type: CardRewardType.LoseRound,
      score: -1,
      params: {
        target: 1
      },
      playerText: 'Vous faites passer un tour à %targets% !',
      viewerText: '%character% fait passer un tour à %targets%'
    }
  },
  {
    name: 'big-party',
    displayName: 'Big party!',
    playerText:
      "C'est la fièvre du samedi soir chez votre voisinne Claudine! Vous décidez d'appeler la brigade!",
    viewerText:
      "C'est la fièvre du samedi soir chez la voisinne Claudine!  %character% décide d'appeler la brigade!",
    effect: "Faites reculer un joueur d'une case !",
    reward: {
      type: CardRewardType.Backward,
      score: -1,
      params: {
        target: 1,
        cases: 1
      },
      playerText: "Vous faites reculer %targets% d'une case !",
      viewerText: "%character% fait reculer %targets% d'une case !"
    }
  },
  {
    name: 'go-home',
    displayName: 'Rentre chez toi',
    playerText:
      "C'est un vrai poulailler ici ! Vu le bruit, vous êtes obligés de rentrer chez vous pour faire du télé-travail.",
    viewerText:
      "C'est un vrai poulailler ici ! %character% est obligés de rentrer au bercail pour faire du télé-travail.",
    effect: 'Faites reculer un joueur de 2 cases !',
    reward: {
      type: CardRewardType.Backward,
      score: -2,
      params: {
        target: 1,
        cases: 2
      },
      playerText: 'Vous faites reculer %targets% de 2 cases !',
      viewerText: '%character% fait reculer %targets% de 2 cases !'
    }
  },
  {
    name: 'clean-it-up',
    displayName: 'Nettoie tout!',
    playerText:
      "Personne ne nettoie les toilettes a part vous. Aujourd'hui, vous désignez quelqu'un pour passer le balais.",
    viewerText:
      "Personne ne nettoie les toilettes a part %character%, qui désigne quelqu'un pour passer le balais.",
    effect: "Faites reculer un joueur d'une case !",
    reward: {
      type: CardRewardType.Backward,
      score: -1,
      params: {
        target: 1,
        cases: 1
      },
      playerText: "Vous faites reculer %targets% d'une case !",
      viewerText: "%character% fait reculer %targets% d'une case !"
    }
  },
  {
    name: 'bullying',
    displayName: 'Harcélement',
    playerText:
      "Un chaud lapin s'approche près de vous et vous siffle. Vous décidez d'appeler à l'aide.",
    viewerText:
      "Un chaud lapin s'approche près de %character% et siffle. %character% décide d'appeler à l'aide.",
    effect: 'Faites passer un tour à un joueur !',
    reward: {
      type: CardRewardType.LoseRound,
      score: -1,
      params: {
        target: 1
      },
      playerText: 'Vous faites passer un tour à %targets% !',
      viewerText: '%character% fait passer un tour à %targets% !'
    }
  },
  {
    name: 'bye-bike',
    displayName: 'Adieu, mon vélo',
    playerText:
      'Felicia Felix paraît douce au premier bord. Elle a pourtant crevé les pneux des velibs de votre station, pour le fun.',
    viewerText:
      'Felicia Felix paraît douce comme ça. Elle a pourtant crevé les pneux des velibs de la station de %character%.',
    effect: "Tournez une case autour d'un joueur !",
    reward: {
      type: CardRewardType.Turn,
      score: -2,
      params: {
        target: 1,
        cases: 1
      },
      playerText: 'Vous tournez une case autour de %targets% !',
      viewerText: '%character% tourne une case autour de %targets% !'
    }
  },
  {
    name: 'throw-phone',
    displayName: 'Jette ton tel!',
    playerText:
      'Madame Blanquette a failli vous percuter étant sur son bigo ! Elle vous dépose donc quelques rues plus loin. ',
    viewerText:
      'Madame Blanquette a failli percuter %character%. Elle dépose donc %character% quelques rues plus loin. ',
    effect: "Tournez une case autour d'un joueur !",
    reward: {
      type: CardRewardType.Turn,
      score: -1,
      params: {
        target: 1,
        cases: 1
      },
      playerText: 'Vous tournez une case autour de %targets% !',
      viewerText: '%character% tourne une case autour de %targets% !'
    }
  },
  {
    name: 'leave-it-here',
    displayName: 'Laisse tout ici',
    playerText:
      'Mr Chabichou à oublier de prendre des courgettes et laisse son cadis en plan. Vous le poussez pour passer.',
    viewerText:
      'Mr Chabichou à oublier de prendre des courgettes et laisse son cadis en plan. %character% le pousse pour passer.',
    effect: "Tournez une case autour d'un joueur !",
    reward: {
      type: CardRewardType.Turn,
      score: -1,
      params: {
        target: 1,
        cases: 1
      },
      playerText: 'Vous tournez une case autour de %targets% !',
      viewerText: '%character% tourne une case autour de %targets% !'
    }
  }
]

export default uncivil
