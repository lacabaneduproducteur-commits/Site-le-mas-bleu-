import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company, nav } from '../content/site'
import { Arrow, PhoneIcon } from './Button'
import { LogoLockup } from './Logo'

export function Header() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const close = useCallback(() => setOpen(false), [])

  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 40))
  useEffect(() => setSolid(window.scrollY > 40), [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <a
        href="#contenu"
        className="label fixed top-3 left-3 z-[70] -translate-y-20 rounded-full bg-volt px-4 py-2 text-white focus:translate-y-0"
      >
        Aller au contenu
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid || open ? 'border-b border-line bg-ink/75 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Link to="/" className="relative z-[60] -m-2 p-2" aria-label="YLEC, retour à l’accueil">
            <LogoLockup />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.label}>{item.children ? <Dropdown item={item} /> : <TopLink to={item.to}>{item.label}</TopLink>}</li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={company.phoneHref}
              className="hidden items-center gap-2 px-3 py-2 font-mono text-[0.78rem] text-paper/80 transition-colors hover:text-cyan xl:flex"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {company.phone}
            </a>
            <Link
              to="/contact#devis"
              className="group relative hidden items-center gap-2 overflow-hidden rounded-full bg-volt px-5 py-2.5 text-[0.72rem] font-semibold tracking-[0.14em] text-white uppercase transition-shadow hover:shadow-[0_8px_30px_-6px_rgba(57,123,255,0.8)] sm:inline-flex"
            >
              Demander un devis
              <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={company.phoneHref}
              className="relative z-[60] grid h-11 w-11 place-items-center rounded-full border border-line text-paper lg:hidden"
              aria-label={`Appeler YLEC au ${company.phone}`}
            >
              <PhoneIcon />
            </a>
            <button
              type="button"
              className="relative z-[60] grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 h-[1.5px] w-full bg-paper transition-all duration-300 ${open ? 'top-1/2 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 h-[1.5px] bg-paper transition-all duration-300 ${open ? 'top-1/2 w-full -rotate-45' : 'top-full w-3/5'}`}
                />
              </span>
            </button>
          </div>
        </div>
        {/* Indicateur de progression du défilement */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-gradient-to-r from-volt to-cyan"
          style={{ scaleX: progress }}
        />
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  )
}

function TopLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group relative block px-3.5 py-2 text-[0.82rem] font-medium transition-colors ${isActive ? 'text-white' : 'text-paper/70 hover:text-white'}`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            aria-hidden="true"
            className={`absolute right-3.5 bottom-0.5 left-3.5 h-px origin-left bg-cyan transition-transform duration-500 ${
              isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
            }`}
          />
        </>
      )}
    </NavLink>
  )
}

function Dropdown({ item }: { item: (typeof nav)[number] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const active = item.children?.some((c) => c.to === pathname)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 px-3.5 py-2 text-[0.82rem] font-medium transition-colors ${
          active || open ? 'text-white' : 'text-paper/70 hover:text-white'
        }`}
      >
        {item.label}
        <svg viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 pt-3"
          >
            <ul className="w-64 overflow-hidden rounded-2xl border border-line bg-coal/95 p-2 shadow-2xl backdrop-blur-xl">
              {item.children!.map((c, i) => (
                <li key={c.to}>
                  <NavLink
                    to={c.to}
                    className={({ isActive }) =>
                      `group flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors hover:bg-white/5 ${
                        isActive ? 'text-cyan' : 'text-paper/85 hover:text-white'
                      }`
                    }
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[0.65rem] text-mute">0{i + 1}</span>
                      {c.label}
                    </span>
                    <Arrow className="h-3 w-3 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // Piège à focus simple dans le menu ouvert
      if (e.key === 'Tab' && panel.current) {
        const header = document.querySelector('header')
        const focusables = [
          ...(header?.querySelectorAll<HTMLElement>('a[href], button') ?? []),
          ...panel.current.querySelectorAll<HTMLElement>('a[href], button'),
        ].filter((el) => el.offsetParent !== null)
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    panel.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const links = [
    { label: 'Accueil', to: '/' },
    { label: 'Électricité', to: '/electricite' },
    { label: 'Climatisation', to: '/climatisation' },
    { label: 'Dépannage', to: '/depannage' },
    { label: 'Réalisations', to: '/realisations' },
    { label: 'L’entreprise', to: '/entreprise' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="menu-mobile"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-[88px] lg:hidden"
          initial={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.25rem)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 2.5rem) 2.25rem)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 2.5rem) 2.25rem)' }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <div aria-hidden="true" className="bg-blueprint pointer-events-none absolute inset-0 opacity-60" />
          <nav aria-label="Navigation mobile" className="container-x relative flex-1">
            <ul>
              {links.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  <NavLink
                    to={l.to}
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `text-display flex items-baseline gap-4 py-4 text-[clamp(1.8rem,8vw,3rem)] ${isActive ? 'text-cyan' : 'text-paper'}`
                    }
                  >
                    <span className="font-mono text-xs font-normal tracking-normal text-mute">0{i + 1}</span>
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
          <motion.div
            className="container-x relative grid gap-3 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <a
              href={company.phoneHref}
              className="flex items-center justify-center gap-3 rounded-full bg-volt py-4 font-mono text-lg text-white"
            >
              <PhoneIcon /> {company.phone}
            </a>
            <Link
              to="/contact#devis"
              onClick={onClose}
              className="flex items-center justify-center gap-2 rounded-full border border-paper/25 py-4 text-xs font-semibold tracking-[0.14em] uppercase"
            >
              Demander un devis <Arrow className="h-3 w-3" />
            </Link>
            <p className="label mt-2 text-center text-mute">Perpignan · Pyrénées-Orientales</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
