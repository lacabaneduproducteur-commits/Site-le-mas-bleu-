// Photographies d'ambiance (hero, cartes d'expertise, section Heiwa).
//
// Laisser à null tant que les vraies photos ne sont pas fournies : le site
// affiche alors ses visuels graphiques générés (circuits, illustrations).
// Pour utiliser une photo, la déposer dans public/images/ puis renseigner
// le chemin, ex. hero: { src: '/images/hero.webp', alt: '...' }.

export type Media = { src: string; alt: string } | null

export const media: {
  hero: Media
  electricite: Media
  climatisation: Media
  heiwa: Media
  entreprise: Media
} = {
  hero: null,
  electricite: null,
  climatisation: null,
  heiwa: null,
  entreprise: null,
}
