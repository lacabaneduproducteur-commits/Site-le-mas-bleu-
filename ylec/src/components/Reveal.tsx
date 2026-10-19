import { motion, type HTMLMotionProps } from 'motion/react'
import type { ElementType, ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

type RevealProps = HTMLMotionProps<'div'> & { delay?: number; y?: number }

/** Apparition douce au défilement. */
export function Reveal({ delay = 0, y = 28, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type SplitProps = {
  /** Une entrée par ligne ; chaque mot glisse depuis un masque. */
  lines: ReactNode[][] | string[]
  as?: ElementType
  className?: string
  lineClassName?: (i: number) => string
  delay?: number
  /** Anime à l'affichage (hero) plutôt qu'au défilement. */
  immediate?: boolean
  stagger?: number
  id?: string
}

export function SplitText({
  lines,
  as: Tag = 'h2',
  className = '',
  lineClassName,
  delay = 0,
  immediate = false,
  stagger = 0.06,
  id,
}: SplitProps) {
  let wordIndex = 0
  const viewProps = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }

  return (
    <Tag id={id} className={className}>
      <motion.span className="block" initial="hidden" {...viewProps}>
        {lines.map((line, i) => {
          const words = typeof line === 'string' ? line.split(' ') : line
          return (
            <span key={i} className={`block ${lineClassName?.(i) ?? ''}`}>
              {words.map((w, j) => {
                const idx = wordIndex++
                return (
                  <span key={j} className="-mt-[0.14em] inline-block overflow-hidden pt-[0.14em] pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={{
                        hidden: { y: '110%', rotate: 4 },
                        show: { y: '0%', rotate: 0, transition: { duration: 0.95, delay: delay + idx * stagger, ease } },
                      }}
                    >
                      {w}
                    </motion.span>
                    {j < words.length - 1 ? ' ' : null}
                  </span>
                )
              })}
            </span>
          )
        })}
      </motion.span>
    </Tag>
  )
}

/** Petit sur-titre technique, précédé d'un trait qui se dessine. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      className={`label flex items-center gap-3 text-cyan ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.span
        aria-hidden="true"
        className="h-px w-10 origin-left bg-cyan"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease }}
      />
      {children}
    </motion.p>
  )
}
