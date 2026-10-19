import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CircuitCanvas } from './CircuitCanvas'
import { SplitText } from './Reveal'

type Props = {
  crumb: string
  eyebrow: string
  lines: (string | ReactNode)[][] | string[]
  intro?: ReactNode
  children?: ReactNode
}

/** En-tête des pages secondaires, dans la continuité du hero d'accueil. */
export function PageHero({ crumb, eyebrow, lines, intro, children }: Props) {
  return (
    <section data-section={crumb} className="grain relative isolate overflow-hidden pt-36 pb-20 lg:pt-48 lg:pb-28">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_80%_30%,black,transparent_70%)]" />
        <div className="absolute top-[30%] left-[82%] h-[50vmin] w-[50vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/20 blur-[110px]" />
        <CircuitCanvas target={{ x: 0.82, y: 0.3 }} density={0.55} revealDuration={1.3} />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>
      <div className="container-x">
        <motion.nav
          aria-label="Fil d’Ariane"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ol className="label flex items-center gap-3 text-paper/45">
            <li>
              <Link to="/" className="hover:text-paper">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-cyan">
              {crumb}
            </li>
          </ol>
        </motion.nav>
        <motion.p
          className="label mt-10 text-paper/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {eyebrow}
        </motion.p>
        <SplitText
          as="h1"
          immediate
          delay={0.2}
          className="text-display mt-5 max-w-6xl text-[clamp(2.3rem,5.4vw,5.2rem)]"
          lineClassName={(i) => (i === 1 ? 'text-paper/45' : '')}
          lines={lines as string[]}
        />
        {intro && (
          <motion.div
            className="mt-8 max-w-2xl text-lg leading-relaxed text-paper/70"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {intro}
          </motion.div>
        )}
        {children && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
