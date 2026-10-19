# Site YLEC Électricité Climatisation 66

Nouveau site de YLEC (Yoan Lecointe, Perpignan) : électricité générale et climatisation.
React + TypeScript, Tailwind CSS 4, Motion. Chaque page est pré-rendue en HTML statique au build (SEO).

## Commandes

```bash
npm install
npm run dev       # développement : http://localhost:5173
npm run build     # production : dossier dist/ (HTML pré-rendu + sitemap.xml)
npm run preview   # tester le build
```

`dist/` se déploie sur n'importe quel hébergement statique (Netlify, Vercel, Cloudflare Pages, OVH…).
Chaque page est générée dans `dist/<page>/index.html` ; `dist/404.html` sert de page d'erreur.

## À faire avant la mise en ligne

1. **Formulaire de devis** — créer un formulaire sur un service d'envoi (ex. [Formspree](https://formspree.io),
   destinataire `yl.elec@hotmail.com`), puis copier `.env.example` en `.env` et renseigner :
   - `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxx`
   - `VITE_FORM_ALLOW_FILES=true` seulement si l'offre choisie accepte les pièces jointes
     (le champ « photos ou documents » n'apparaît qu'à cette condition).

   Sans configuration, le bouton « Envoyer ma demande » ouvre la messagerie du visiteur avec la demande
   pré-remplie : aucun envoi n'est simulé.
   Indiquer ensuite le nom du service dans la politique de confidentialité.
2. **Réalisations** — déposer les vraies photos dans `public/realisations/` et les déclarer dans
   `src/content/projects.ts`. Tant que la liste est vide, la galerie affiche des emplacements
   « Photo à intégrer ».
3. **Photos d'ambiance** (facultatif) — hero, cartes d'expertise, Heiwa, portrait : `src/content/media.ts`.
   Sans photo, le site utilise ses visuels graphiques générés.
4. **Mentions légales** — compléter adresse, SIRET, hébergeur et durée de conservation
   (repères surlignés en bleu dans `src/pages/Pages.tsx`).
5. **Heiwa** — le logo officiel n'est pas intégré : à ajouter uniquement avec l'accord de la marque.
6. **Réseaux sociaux** — à ajouter dans `company.socials` (`src/content/site.ts`) s'ils existent.
7. Si le domaine change, modifier `SITE_URL` (`src/content/site.ts`), `scripts/prerender.mjs` et `public/robots.txt`.

## Où modifier quoi

| Contenu | Fichier |
| --- | --- |
| Coordonnées, horaires, prestations, étapes, menu | `src/content/site.ts` |
| Titres et descriptions SEO, données structurées | `src/content/seo.ts` |
| Réalisations | `src/content/projects.ts` |
| Couleurs, typographies | `src/index.css` (`@theme`) |
