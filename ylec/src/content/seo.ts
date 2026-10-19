import { SITE_URL, company } from './site'

export type PageMeta = { title: string; description: string }

export const routes: Record<string, PageMeta> = {
  '/': {
    title: 'Électricien & climatisation à Perpignan | YLEC Électricité Climatisation 66',
    description:
      'YLEC, électricité générale et installation de climatisation à Perpignan et dans les Pyrénées-Orientales. Neuf, rénovation et dépannage pour particuliers et professionnels.',
  },
  '/electricite': {
    title: 'Électricité générale à Perpignan, neuf et rénovation | YLEC',
    description:
      'Installation électrique en neuf, rénovation électrique, tableaux, circuits, prises et éclairages à Perpignan et dans les Pyrénées-Orientales. Demandez votre devis.',
  },
  '/climatisation': {
    title: 'Installation de climatisation à Perpignan (66) | YLEC',
    description:
      'Étude, installation, raccordement et mise en service de climatisation pour maisons, appartements, commerces et bureaux dans les Pyrénées-Orientales. Ambassadeur Heiwa.',
  },
  '/depannage': {
    title: 'Dépannage électrique et climatisation dans le 66 | YLEC',
    description:
      'Panne électrique ou climatisation en défaut à Perpignan et dans les Pyrénées-Orientales ? Contactez YLEC au 06 01 23 55 72.',
  },
  '/realisations': {
    title: 'Nos réalisations en électricité et climatisation | YLEC',
    description:
      'Découvrez des chantiers réalisés par YLEC : installations de climatisation, tableaux électriques, raccordements et éclairages LED dans les Pyrénées-Orientales.',
  },
  '/entreprise': {
    title: 'L’entreprise YLEC, Yoan Lecointe | Électricien à Perpignan',
    description:
      'YLEC Électricité Climatisation 66, entreprise locale dirigée par Yoan Lecointe : écoute, conseils clairs et travail soigné à Perpignan et dans le 66.',
  },
  '/contact': {
    title: 'Contact et demande de devis | YLEC Électricité Climatisation 66',
    description:
      'Un projet d’électricité ou de climatisation à Perpignan ou dans les Pyrénées-Orientales ? Demandez votre devis ou appelez le 06 01 23 55 72.',
  },
  '/mentions-legales': {
    title: 'Mentions légales | YLEC',
    description: 'Mentions légales du site YLEC Électricité Climatisation 66.',
  },
  '/confidentialite': {
    title: 'Politique de confidentialité | YLEC',
    description: 'Politique de confidentialité et traitement des données personnelles du site YLEC.',
  },
}

export const notFoundMeta: PageMeta = {
  title: 'Page introuvable | YLEC',
  description: 'Cette page n’existe pas ou a été déplacée.',
}

export function metaFor(pathname: string): PageMeta {
  return routes[pathname] ?? notFoundMeta
}

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Electrician', 'HVACBusiness'],
  name: company.name,
  url: SITE_URL,
  telephone: '+33601235572',
  email: company.email,
  founder: { '@type': 'Person', name: company.manager },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Perpignan',
    addressRegion: 'Pyrénées-Orientales',
    addressCountry: 'FR',
  },
  areaServed: [
    { '@type': 'City', name: 'Perpignan' },
    { '@type': 'AdministrativeArea', name: 'Pyrénées-Orientales' },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '20:00',
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '07:00', closes: '18:00' },
  ],
  knowsAbout: ['Électricité générale', 'Rénovation électrique', 'Installation de climatisation', 'Dépannage électrique'],
}

export function headTags(pathname: string): string {
  const m = metaFor(pathname)
  const url = SITE_URL + (pathname === '/' ? '/' : pathname)
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta property="og:site_name" content="${esc(company.name)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<script type="application/ld+json">${JSON.stringify(localBusinessJsonLd).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}
