import { Card, CardRewardType } from '../../typings/card'

const civil: Card[] = [
  {
    name: 'get-up',
    displayName: 'Lève-toi!',
    playerText:
      'Monsieur Lane ne veut pas se lever. Vous cédez votre place à Madame Henriette la biquette qui vous remercie.',
    viewerText:
      "Monsieur Lanene veut pas se lever. %character% cède sa place à Madame Henriette la biquette qui l'en remercie.",
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 2
      },
      playerText: 'Vous avancez de 2 cases !',
      viewerText: '%character% avance de 2 cases !'
    }
  },
  {
    name: 'block-escalators',
    displayName: 'Bloquer les escalators',
    playerText:
      "Monsieur Tartare s'essouffle! Il fait une pause en plein milieu de l'escalator. Aucun moyen de le doubler.",
    viewerText:
      "Monsieur Tartare s'essouffle! Il fait une pause en plein milieu de l'escalator. Aucun moyen de le doubler.",
    reward: {
      type: CardRewardType.LoseRound,
      score: 0.5,
      playerText: 'Vous passez votre tour !',
      viewerText: '%character% passe son tour !'
    }
  },
  {
    name: 'crouded-subway',
    displayName: 'Métro bondé',
    playerText:
      "Monsieur Couenne force pour rentrer dans le métro. Vous décidez d'attendre le prochain.",
    viewerText:
      "Monsieur Couenne force pour rentrer dans le métro. %character% décide d'attendre le prochain.",
    reward: {
      type: CardRewardType.LoseRound,
      score: 0.5,
      playerText: 'Vous passez votre tour !',
      viewerText: '%character% passe son tour !'
    }
  },
  {
    name: 'manspreading',
    displayName: 'Manspreading',
    playerText:
      "Monsieur Trotro s'asseoit et vous propose son meilleur manspreading. Vous décidez de changer de place.",
    viewerText:
      "Monsieur Trotro s'asseoit et propose son meilleur manspreading. %character% décide de changer de place.",
    reward: {
      type: CardRewardType.Turn,
      score: 0.5,
      params: {
        cases: 1
      },
      playerText: 'Vous tournez une case autour de vous !',
      viewerText: '%character% tourne une case autour %pronoun% !'
    }
  },
  {
    name: 'stalker-on-board',
    displayName: 'Voyeur à bord',
    playerText:
      'Madame Figarone lis tous vos messages par dessus votre épaule. Vous décidez alors de changer de rame.',
    viewerText:
      'Madame Figaro lis tous les messages de %character% par dessus son épaule, qui décide alors de changer de rame.',
    reward: {
      type: CardRewardType.Turn,
      score: 0.5,
      params: {
        cases: 1
      },
      playerText: 'Vous tournez une case autour de vous !',
      viewerText: '%character% tourne une case autour %pronoun% !'
    }
  },
  {
    name: 'dirty-feet',
    displayName: 'Pieds sales',
    playerText:
      'Madame Rosette utilise le dernier siège pour reposer ses sabots. Vous ne savez pas où vous mettre.',
    viewerText:
      'Madame Rosette utilise le dernier siège pour reposer ses sabots. %character% ne sait pas où se mettre.',
    reward: {
      type: CardRewardType.Turn,
      score: 0.5,
      params: {
        cases: 1
      },
      playerText: 'Vous tournez une case autour de vous !',
      viewerText: '%character% tourne une case autour %pronoun% !'
    }
  },
  {
    name: 'clean-up',
    displayName: 'Nettoyage',
    playerText:
      'Vous décidez nettoyer les ordures du voisin sur le pallier. Le gardien vous remercie.',
    viewerText:
      '%character% décide de nettoyer les ordures du voisin sur le pallier. Le gardien remercie %character%.',
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 1
      },
      playerText: "Vous avancez d'une case !",
      viewerText: "%character% avance d'une case !"
    }
  },
  {
    name: 'bad-ninja',
    displayName: 'Vilain ninja',
    playerText:
      'Mr Jacasse décide fait une balayette sur une personne agée. Vous aidez la personne à se relever.',
    viewerText:
      'Mr Jacasse fait une balayette sur une personne agée. %character% aide la personne à se relever.',
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 2
      },
      playerText: 'Vous avancez de 2 cases !',
      viewerText: '%character% avance de 2 cases !'
    }
  },
  {
    name: 'spit-it-out',
    displayName: 'Crache le morceau',
    playerText:
      'Mr Dalaï a un chat dans la gorge et crache au milieu de la rue. Vous avertissez un agent de propreté.',
    viewerText:
      'Mr Dalaï a un chat dans la gorge et crache au milieu de la rue. %character% avertit un agent de propreté.',
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 1
      },
      playerText: "Vous avancez d'une case !",
      viewerText: "%character% avance d'une case !"
    }
  },
  {
    name: 'umbrella',
    displayName: 'Le parapluie',
    playerText:
      'Thierry Kermite ouvre son parapluie sans faire attention. Changez de trottoir pour gagner du temps.',
    viewerText:
      'Thierry Kermite ouvre son parapluie sans faire attention. %character% change de trottoir pour gagner du temps.',
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 1
      },
      playerText: "Vous avancez d'une case !",
      viewerText: "%character% avance d'une case !"
    }
  },
  {
    name: 'free-can',
    displayName: 'Canette libre',
    playerText:
      'Madame Lardon est pressée, elle ouvre sa vitre et jette sa canette ! Vous ramassez et on vous félicite !',
    viewerText:
      "Madame Lardon est pressée, elle ouvre sa vitre et jette sa canette ! %character% ramasse et on l'en félicite !",
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 1
      },
      playerText: "Vous avancez d'une case !",
      viewerText: "%character% avance d'une case !"
    }
  },
  {
    name: 'switch-lane',
    displayName: 'Changement de file',
    playerText:
      'Anna Angora est très préssée. Elle double à la caisse. Vous changez de file pour avancer plus vite.',
    viewerText:
      'Anna Angora est très préssée. Elle double à la caisse. %character% change de file pour avancer plus vite.',
    effect: 'Vous échangez de place avec un joueur !',
    reward: {
      type: CardRewardType.SwichPlace,
      score: 0,
      params: {
        target: 1
      },
      playerText: 'Vous échangez de place avec %targets% !',
      viewerText: '%character% échange de place avec %targets% !'
    }
  },
  {
    name: 'pop-corn-sea',
    displayName: 'Mer de pop corn',
    playerText:
      'Mr Salami a rigolé fort au cinéma et a éparpillé son pop corn partout. Vous nettoyez et on vous remercie !',
    viewerText:
      "Mr Salami a rigolé fort au cinéma et a éparpillé son pop corn partout. %character% nettoie et on l'en remercie !",
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 1
      },
      playerText: "Vous avancez d'une case !",
      viewerText: "%character% avance d'une case !"
    }
  },
  {
    name: 'chicken-coop',
    displayName: 'Le poulailler',
    playerText:
      "Les deux personnes à côté de vous n'arrête pas de pialler au Gomont Paté! Vous changez de place.",
    viewerText:
      "Les deux personnes à côté de %character% n'arrête pas de pialler au Gomont Paté! %character% change de place.",
    reward: {
      type: CardRewardType.Forward,
      score: 1,
      params: {
        cases: 1
      },
      playerText: "Vous avancez d'une case !",
      viewerText: "%character% avance d'une case !"
    }
  }
]

export default civil
