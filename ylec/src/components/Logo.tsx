import { motion, useReducedMotion } from 'motion/react'

// Monogramme YLEC dessiné au trait : chaque lettre est un tracé qui peut
// « s'allumer » comme un circuit. Grille de 40 × 48 par lettre.
const letters = [
  'M2 2 L22 25 L42 2 M22 25 V50',
  'M58 2 V50 H90',
  'M140 2 H106 V50 H140 M106 26 H134',
  'M196 2 H166 Q156 2 156 12 V40 Q156 50 166 50 H196',
]

type Props = {
  className?: string
  /** Anime le tracé du logo à l'affichage. */
  draw?: boolean
  delay?: number
  title?: string
}

export function Logo({ className = '', draw = false, delay = 0, title = 'YLEC' }: Props) {
  const reduce = useReducedMotion()
  const animate = draw && !reduce

  return (
    <svg viewBox="-4 -4 206 60" className={className} role="img" aria-label={title} fill="none">
      <title>{title}</title>
      {letters.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={7}
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial={animate ? { pathLength: 0, opacity: 0 } : false}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: delay + i * 0.14, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
      {/* Nœud du Y : le point d'énergie */}
      <motion.circle
        cx={22}
        cy={25}
        r={5.5}
        fill="var(--color-volt)"
        initial={animate ? { scale: 0, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '22px 25px' }}
      />
    </svg>
  )
}

/** Version compacte pour l'en-tête : monogramme + mention métier. */
export function LogoLockup({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <Logo className="h-[18px] w-auto text-paper" title="YLEC Électricité Climatisation 66" />
      <span className="hidden border-l border-line pl-3 font-mono text-[0.6rem] leading-tight tracking-[0.16em] text-mute uppercase sm:block">
        Électricité
        <br />
        Climatisation 66
      </span>
    </span>
  )
}
