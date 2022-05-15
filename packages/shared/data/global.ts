import { Gender } from '../typings'

export default {
  general: {
    civil: 'coup de pouce',
    uncivil: 'coup de boule',
    or: 'ou',
    back: 'retour',
    skip: 'passer',
    cancel: 'annuler'
  },
  pronoun: {
    [Gender.Female]: "d'elle",
    [Gender.Male]: 'de lui'
  },
  main: {
    nfc: {
      title: 'Prêt à scanner',
      text: 'Tenez votre appareil près du tag NFC'
    }
  },
  welcome: {
    start: 'Commencer une partie',
    nfc: 'Placez votre téléphone devant le tag NFC de la boite.',
    qr_code: 'Scannez le QR code en ouvrant votre appareil photo.'
  },
  room: {
    owner_title: 'indiquez que tout le monde est là !',
    owner_subtitle_1: 'une partie peut contenir entre ',
    owner_subtitle_2: ' et ',
    owner_subtitle_3: ' joueurs',
    owner_button: 'prêêêêt',
    player_title: 'attendez',
    player_subtitle_1: 'Un peu de patience !',
    player_subtitle_2: 'Les joueurs rejoignent la partie !'
  },
  join: {
    hello: 'hello',
    introduction: 'Vous avez rejoins la partie !',
    text_1: 'Vous venez d’arriver à la station Porc Royal.',
    text_2:
      'Ici c’est la jungle et les gens se comportent comme des animaux. Vous allez devoir vous frayer un chemin pour être à l’heure à votre rendez-vous.'
  },
  setup: {
    title_first: 'Placez vos p',
    title_second: 'ons',
    title_punctuation: '!!!',
    cta_skip: 'PASSER'
  },
  role: {
    character_indicator: 'perso',
    skill_indicator: 'objet',
    goal_indicator: 'objectif',
    cta_ready: 'PRÊÊÊÊT'
  },
  pending: {
    title: {
      title: 'Attendez',
      hashtag: ['#comptez', 'les moutons']
    },
    text: [
      'Madame tortue prends tout son temps en caisse du supermarché.',
      'Ne faites pas de salade et attendez que tout le monde soit prêt.'
    ]
  },
  walktrough: {
    character: 'perso',
    object: 'objet',
    goal: 'objectif',
    cta_ready: 'PRÊÊÊÊT'
  },
  game: {
    forwardOrTurn: {
      title_1: 'avancez',
      title_2: 'ou',
      title_3: 'tournez',
      title_hashtag: 'une case',
      text:
        'Vous pouvez avancer d’une case ou tourner une case autour de vous.',
      cta_ok: 'OKÉÉÉ'
    },
    playerChoice: {},
    spectator: {
      title_1: 'joue son',
      title_2: 'tour',
      warning: 'soyez attentif aux actions des autres joueurs !',
      new_step: 'peut décider d’avancer ou de tourner une case autour de lui.',
      card_step: 'choisit une carte coup de boule ou coup de pouce.'
    }
  },
  cardStep: {
    player: {
      choosed_1: 'vous avez',
      choosed_2: 'choisi'
    },
    viewer: {
      choosed: 'a choisi'
    }
  },
  gameCard: {
    cta_ok: 'OKÉÉÉ',
    confirm: 'Confirmez votre choix',
    cta_yes: 'YEP',
    cta_no: 'NOPE',
    choice: 'Choix',
    choosed: ' a choisi'
  },
  gameOver: {
    title_1: 'confirmez-vous',
    title_2: 'la fin de la partie ?',
    cta_yes: 'YEP',
    cta_no: 'NOPE'
  },
  report: {
    title: 'La brigade',
    complete:
      'Votre appel a bien été pris en compte ! La brigade va étudier votre dossier.',
    cta_yes: 'YEP',
    cta_no: 'NOPE',
    confirm: {
      text_1: 'Vous êtes sur le point de dénoncer ',
      text_2: ' à la brigade.',
      description: 'confirmez votre choix:'
    },
    select: {
      text:
        'Vous trouvez qu’un joueur commet trop d’incivilités ? Les poulets sont là pour rétablir l’ordre dans la basse cour.',
      description: 'quel joueur dénoncer :'
    }
  },
  skill: {
    content: {
      confirm: 'confirmez votre choix'
    },
    cta_yes: 'YEP',
    cta_no: 'NOPE'
  },
  phoneCall: {
    title: 'La brigade',
    incoming: 'Appel entrant',
    offHook: 'Appel en cours...'
  },
  notifications: {
    skill: {
      title: 'dommage',
      description: 'Une notification reçue...',
      icon: 'lightning',
      inner: {
        title: 'dommage'
      }
    },
    regularization: {
      reward: {
        title: 'la brigade',
        description: 'Une notification reçue...',
        icon: 'brigade',
        inner: {
          title: 'attention',
          text:
            'Bravo vous êtes doux comme des agneaux, la brigade tient a tous vous remercier !',
          description: "tous les joueurs avancent d'une case !"
        }
      },
      penalty: {
        title: 'la brigade',
        description: 'Une notification reçue...',
        icon: 'brigade',
        inner: {
          title: 'attention',
          text:
            'C’est la jungle ici, vous commettez trop d’impolitesses ! C’est une amende de la brigade pour tout le monde !',
          description: 'tout les joueurs reculent de trois cases !'
        }
      }
    }
  },
  statistics: {
    cta_replay: 'rejouer',
    civil:
      'On peut dire que vous êtes tous retombé sur vos pattes ! Vous êtes de braves citoyens !',
    uncivil:
      'Dis donc, on peut dire que vous appréciez vous volez dans les plumes !',
    appraisal: {
      title_1: 'bilan',
      title_2: 'des comptes',
      description: '#enflure',
      civil: 'coup de pouce',
      uncivil: 'coup de boule'
    },
    titles: {
      subtitle: 'vos titres',
      title: 'bravo'
    },
    player: {
      subtitle: 'votre jeu'
    },
    game: {
      subtitle: 'la partie'
    }
  },
  minigame: {
    start: {
      subtitle: 'mini-jeu'
    },
    go: {
      title: 'prêts ?',
      description: 'a battre du fer ?'
    },
    results: {
      winner: 'gagné',
      looser: 'perdu'
    }
  }
}
