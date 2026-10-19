import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { MobileActionBar, SectionIndicator } from './components/Chrome'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { SITE_URL } from './content/site'
import { metaFor } from './content/seo'
import { ExpertisePage } from './pages/ExpertisePage'
import {
  ContactPage,
  Confidentialite,
  Depannage,
  Entreprise,
  Home,
  MentionsLegales,
  NotFound,
  Realisations,
} from './pages/Pages'

function RouteEffects() {
  const { pathname, hash } = useLocation()

  // Métadonnées à chaque navigation côté client (le pré-rendu les fournit au premier chargement).
  useEffect(() => {
    const m = metaFor(pathname)
    document.title = m.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', SITE_URL + pathname)
  }, [pathname])

  // Défilement : haut de page à chaque changement de page, ou ancre ciblée.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouteEffects />
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/electricite" element={<ExpertisePage key="e" slug="electricite" />} />
          <Route path="/climatisation" element={<ExpertisePage key="c" slug="climatisation" />} />
          <Route path="/depannage" element={<Depannage />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <SectionIndicator />
      <MobileActionBar />
    </MotionConfig>
  )
}
