import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { company } from '../content/site'
import { Arrow, PhoneIcon } from './Button'

/** Barre d'appel et de devis, sur mobile, après le premier écran. */
export function MobileActionBar() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.7))

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full border border-line bg-coal/90 p-1.5 shadow-2xl backdrop-blur-xl lg:hidden"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <a href={company.phoneHref} className="flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold">
            <PhoneIcon className="h-4 w-4 text-cyan" /> Appeler
          </a>
          <Link
            to="/contact#devis"
            className="flex items-center justify-center gap-2 rounded-full bg-volt py-3 text-sm font-semibold text-white"
          >
            Devis <Arrow className="h-3 w-3" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Indicateur de section (bureau) : numéro et nom de la section visible. */
export function SectionIndicator() {
  const { pathname } = useLocation()
  const [sections, setSections] = useState<string[]>([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
    setSections(els.map((el) => el.dataset.section ?? ''))
    setActive(0)
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(els.indexOf(e.target as HTMLElement))
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  if (sections.length < 3) return null
  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div aria-hidden="true" className="pointer-events-none fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 flex-col items-end gap-4 mix-blend-difference 2xl:flex">
      <p className="font-mono text-[0.65rem] tracking-[0.2em] text-paper">
        {pad(active + 1)} <span className="text-paper/40">/ {pad(sections.length)}</span>
      </p>
      <div className="flex flex-col items-end gap-2">
        {sections.map((s, i) => (
          <span
            key={s + i}
            className={`h-px bg-paper transition-all duration-500 ${i === active ? 'w-8 opacity-100' : 'w-3 opacity-30'}`}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={sections[active]}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="label origin-right text-[0.6rem] text-paper"
        >
          {sections[active]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
