/* ============================================================
   Données centralisées du site — Le Mas Bleu
   Ajoutez/retirez des lignes ici pour mettre à jour les galeries,
   pas besoin de toucher au HTML.
   ============================================================ */

/* ---------- Galerie générale (page d'accueil) ---------- */
export const GALERIE_IMAGES = [
  { src: '/img/galerie/coucher-soleil.jpg', alt: "Producteur au coucher du soleil sur l'étang de Leucate" },
  { src: '/img/galerie/plateau-port.jpg', alt: 'Plateau de fruits de mer face au port de Leucate' },
  { src: '/img/galerie/equipe.jpg', alt: "L'équipe du Mas Bleu avec un plateau de fruits de mer" },
  { src: '/img/galerie/facade-soir.jpg', alt: 'Façade du Mas Bleu à la tombée du jour' },
  { src: '/img/galerie/plateau-vin.jpg', alt: 'Plateau de fruits de mer et vin blanc face au port' },
  { src: '/img/galerie/camionnette.jpg', alt: 'Ancienne camionnette Le Mas Bleu' },
  { src: '/img/galerie/plateau-oursins.jpg', alt: "Plateau d'oursins et fruits de mer sur le ponton" },
  { src: '/img/galerie/plateau-citronnier.jpg', alt: 'Plateau de fruits de mer sous le citronnier' },
  { src: '/img/mas-bleu.jpg', alt: "Le Mas Bleu, terrasse au bord de l'étang" },
  { src: '/img/cabane-du-producteur.jpg', alt: 'La Cabane du Producteur à Leucate' },
  { src: '/images/maison-coloniale/commun/salon-colonial.jpg', alt: 'Salon colonial de la Maison Coloniale' },
  { src: '/images/maison-coloniale/commun/terrasse.jpg', alt: 'Terrasse ombragée de la Maison Coloniale' },
]

/* ---------- Avis clients (page d'accueil) ---------- */
export const AVIS_ITEMS = [
  {
    text: "Venus pour un apéro huîtres, nous n'avons pas été déçus : belle terrasse calme avec une déco sympa, prix intéressant, bon rapport qualité-prix. Nous avons adoré les huîtres, bien accompagnées d'un vin blanc.",
    author: 'Client Google',
    source: 'Avis Google',
    rating: 5,
  },
  {
    text: 'Les huîtres plus qu\'excellentes, le service plus que parfait, bref nous reviendrons. Merci beaucoup pour votre professionnalisme.',
    author: 'Client Google',
    source: 'Avis Google',
    rating: 5,
  },
]

/* ---------- Chambres de la Maison Coloniale ---------- */
export const ROOM_SUITES = [
  {
    id: 'windsor',
    name: 'Suite Windsor',
    tagline: 'Ambiance tamisée et bain balnéo',
    images: [
      { src: '/images/maison-coloniale/windsor/windsor-01.jpg', alt: 'Suite Windsor, bain balnéo en ambiance tamisée' },
      { src: '/images/maison-coloniale/windsor/windsor-02.jpg', alt: 'Suite Windsor, moment champagne dans le bain balnéo' },
      { src: '/images/maison-coloniale/windsor/windsor-03.jpg', alt: 'Suite Windsor, salle de bain et peignoirs' },
      { src: '/images/maison-coloniale/windsor/windsor-04.jpg', alt: 'Suite Windsor, bain balnéo et carrelage sombre' },
    ],
  },
  {
    id: 'carrington',
    name: 'Suite Carrington',
    tagline: 'Chaleur cuivrée et hammam vitré',
    images: [
      { src: '/images/maison-coloniale/carrington/carrington-01.jpg', alt: 'Suite Carrington, chambre aux tons terracotta' },
      { src: '/images/maison-coloniale/carrington/carrington-02.jpg', alt: 'Suite Carrington, salle de bain carrelage cuivré et hammam' },
    ],
  },
  {
    id: 'westminster',
    name: 'Chambre Westminster',
    tagline: 'Lignes épurées, esprit voûté',
    images: [
      { src: '/images/maison-coloniale/westminster/westminster-01.jpg', alt: 'Chambre Westminster, salle de bain carrelage gris' },
      { src: '/images/maison-coloniale/westminster/westminster-02.jpg', alt: 'Chambre Westminster, bain balnéo et chambre attenante' },
    ],
  },
]

/* ---------- Services de la Maison Coloniale ---------- */
/* icon = clé correspondant à une icône définie dans src/icons.js */
export const MAISON_COLONIALE_SERVICES = [
  { icon: 'bathtub', label: 'Baignoire spa' },
  { icon: 'tv', label: 'Télévision' },
  { icon: 'wifi', label: 'Wi-Fi' },
  { icon: 'airwrap', label: 'Dyson Airwrap' },
  { icon: 'snowflake', label: 'Climatisation' },
  { icon: 'minibar', label: 'Mini-bar' },
  { icon: 'sauna', label: 'Sauna' },
  { icon: 'hammam', label: 'Hammam' },
  { icon: 'pool', label: 'Piscine' },
  { icon: 'terrace', label: 'Libre accès à la terrasse' },
  { icon: 'coffee', label: 'Café à disposition' },
  { icon: 'lounge', label: 'Libre accès au salon colonial' },
]

/* ---------- Logos des enseignes ---------- */
/* Laissez src à null tant que le logo n'a pas été fourni : il ne s'affichera simplement pas. */
export const ESTABLISHMENT_LOGOS = {
  masBleu: { src: '/images/logos/le-mas-bleu.png', alt: 'Logo Le Mas Bleu' },
  cabaneDuProducteur: { src: '/images/logos/la-cabane-du-producteur.png', alt: 'Logo La Cabane du Producteur' },
  maisonColoniale: { src: '/images/logos/la-maison-coloniale.png', alt: 'Logo La Maison Coloniale' },
}
