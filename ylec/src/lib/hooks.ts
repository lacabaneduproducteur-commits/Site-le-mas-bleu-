import { useCallback, useEffect, useState } from 'react'

/** Pose --mx / --my sur l'élément survolé, pour l'effet de halo (.halo). */
export function usePointerHalo<T extends HTMLElement>() {
  return useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])
  return matches
}

/** Vrai une fois le composant monté côté navigateur (évite les écarts d'hydratation). */
export function useMounted() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
