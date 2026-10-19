// Toutes les informations de l'entreprise sont centralisées ici.
// Source : site actuel ylec-clim.fr (plomberie volontairement exclue).

export const SITE_URL = 'https://ylec-clim.fr'

export const company = {
  name: 'YLEC Électricité Climatisation 66',
  shortName: 'YLEC',
  manager: 'Yoan Lecointe',
  phone: '06 01 23 55 72',
  phoneHref: 'tel:+33601235572',
  email: 'yl.elec@hotmail.com',
  city: 'Perpignan',
  department: 'Pyrénées-Orientales (66)',
  area: 'Perpignan et les Pyrénées-Orientales, selon les prestations et la localisation du chantier.',
  hours: [
    { days: 'Lundi – vendredi', time: '7 h – 20 h' },
    { days: 'Samedi', time: '7 h – 18 h' },
    { days: 'Dimanche', time: 'Urgences uniquement' },
  ],
  heiwaUrl: 'https://www.heiwa-france.com/',
  // Ajouter ici les réseaux sociaux uniquement s'ils existent, ex. { label: 'Facebook', href: '...' }
  socials: [] as { label: string; href: string }[],
}

export type Expertise = {
  slug: 'electricite' | 'climatisation'
  index: string
  title: string
  kicker: string
  intro: string
  services: string[]
}

export const expertises: Expertise[] = [
  {
    slug: 'electricite',
    index: '01',
    title: 'Électricité générale',
    kicker: 'Neuf · Rénovation · Dépannage',
    intro:
      'Des installations électriques pensées pour votre quotidien, adaptées à votre bâtiment et réalisées avec soin.',
    services: [
      'Installations électriques en construction neuve',
      'Rénovation et modernisation électrique',
      'Création ou extension de circuits',
      'Pose de prises, interrupteurs et appareillages',
      'Installation d’éclairages intérieurs et extérieurs',
      'Tableaux électriques et protections',
      'Dépannage électrique',
    ],
  },
  {
    slug: 'climatisation',
    index: '02',
    title: 'Climatisation',
    kicker: 'Étude · Installation · Mise en service',
    intro:
      'Des solutions de climatisation adaptées à vos espaces pour améliorer votre confort thermique tout au long de l’année.',
    services: [
      'Étude du besoin et choix de l’équipement adapté',
      'Installation de climatisation',
      'Pose et raccordement des équipements',
      'Mise en service et vérification du fonctionnement',
      'Solutions pour maisons, appartements, commerces et bureaux',
      'Interventions en neuf et en rénovation',
      'Dépannage de climatisation',
    ],
  },
]

export const commitments = [
  'Des solutions adaptées à chaque projet.',
  'Des interventions en neuf et en rénovation.',
  'Un accompagnement personnalisé.',
  'Une attention portée à la qualité des finitions.',
]

export const steps = [
  {
    n: '01',
    title: 'Échange et compréhension du besoin',
    text: 'Vous nous présentez votre projet ou votre problème : type de bâtiment, usages, contraintes. Nous prenons le temps de bien comprendre ce que vous attendez.',
  },
  {
    n: '02',
    title: 'Étude et proposition adaptée',
    text: 'Nous étudions la situation et vous proposons une solution claire et adaptée à votre logement ou à vos locaux, en électricité comme en climatisation.',
  },
  {
    n: '03',
    title: 'Réalisation des travaux',
    text: 'L’installation est réalisée avec soin, en construction neuve comme en rénovation, avec une attention particulière portée aux finitions.',
  },
  {
    n: '04',
    title: 'Vérifications et finalisation',
    text: 'Contrôle du fonctionnement, mise en service des équipements et explications sur l’utilisation de votre installation.',
  },
]

export type NavItem = { label: string; to: string; children?: { label: string; to: string }[] }

export const nav: NavItem[] = [
  { label: 'Accueil', to: '/' },
  {
    label: 'Nos expertises',
    to: '/electricite',
    children: [
      { label: 'Électricité générale', to: '/electricite' },
      { label: 'Climatisation', to: '/climatisation' },
      { label: 'Dépannage', to: '/depannage' },
    ],
  },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'L’entreprise', to: '/entreprise' },
  { label: 'Contact', to: '/contact' },
]
