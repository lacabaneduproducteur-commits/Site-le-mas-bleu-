// Réalisations RÉELLES de YLEC uniquement.
//
// Pour ajouter une réalisation :
//   1. déposer les photos dans public/realisations/ (format .webp ou .jpg, 1600 px de large conseillé) ;
//   2. ajouter une entrée ci-dessous.
//
// Tant que la liste est vide, la galerie affiche des emplacements clairement
// marqués « Photo à intégrer » : aucune image de démonstration n'est présentée
// comme un chantier réalisé.

export type ProjectCategory = 'Électricité' | 'Climatisation' | 'Rénovation' | 'Éclairage'

export const categories: ProjectCategory[] = ['Électricité', 'Climatisation', 'Rénovation', 'Éclairage']

export type Project = {
  id: string
  title: string
  categories: ProjectCategory[]
  service: string
  description: string
  /** Chemins depuis /public, ex. '/realisations/tableau-1.webp'. La première photo sert de couverture. */
  photos: { src: string; alt: string }[]
  /** Facultatif : commune ou secteur, uniquement si le client l'accepte. */
  place?: string
}

export const projects: Project[] = [
  // Exemple (à décommenter et adapter avec une vraie réalisation) :
  // {
  //   id: 'tableau-electrique-renovation',
  //   title: 'Remplacement d’un tableau électrique',
  //   categories: ['Électricité', 'Rénovation'],
  //   service: 'Tableau électrique et protections',
  //   description: 'Remplacement complet du tableau et reprise des circuits.',
  //   photos: [{ src: '/realisations/tableau-1.webp', alt: 'Tableau électrique neuf avec disjoncteurs repérés' }],
  // },
]

/** Emplacements affichés tant qu'aucune réalisation réelle n'est renseignée. */
export const placeholderSlots: { id: string; categories: ProjectCategory[]; label: string }[] = [
  { id: 'slot-1', categories: ['Climatisation'], label: 'Installation de climatisation' },
  { id: 'slot-2', categories: ['Électricité'], label: 'Tableau électrique' },
  { id: 'slot-3', categories: ['Éclairage'], label: 'Éclairage LED' },
  { id: 'slot-4', categories: ['Électricité', 'Rénovation'], label: 'Raccordements' },
  { id: 'slot-5', categories: ['Climatisation'], label: 'Unité extérieure' },
  { id: 'slot-6', categories: ['Rénovation', 'Électricité'], label: 'Rénovation électrique' },
]
