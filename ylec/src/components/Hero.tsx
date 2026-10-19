import { asset } from '../lib/asset'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { company } from '../content/site'
import { media } from '../content/media'
import { useMediaQuery } from '../lib/hooks'
import { Button, PhoneIcon } from './Button'
import { CircuitCanvas } from './CircuitCanvas'
import { Logo } from './Logo'
import { SplitText } from './Reveal'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const desktop = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const logoY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-40%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const target = desktop ? { x: 0.76, y: 0.4 } : { x: 0.5, y: 0.19 }

  return (
    <section
      ref={ref}
      data-section="Accueil"
      className="grain relative isolate flex min-h-[640px] items-end overflow-hidden bg-ink pt-[max(38svh,240px)] pb-10 lg:min-h-[760px] lg:pt-[120px]"
      style={{ minHeight: '100svh' }}
      aria-labelledby="hero-title"
    >
      {/* Fond : photo si fournie, sinon composition lumineuse */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" style={{ y: bgY }}>
        {media.hero ? (
          <>
            <img src={asset(media.hero.src)} alt="" className="h-full w-full scale-110 object-cover" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
          </>
        ) : (
          <>
            <div className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_45%,black,transparent_75%)]" />
            <div className="absolute top-[44%] left-[74%] hidden h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/25 blur-[120px] lg:block" />
            <div className="absolute top-[26%] left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/20 blur-[100px] lg:hidden" />
          </>
        )}
      </motion.div>

      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <CircuitCanvas target={target} />
        {/* Voile pour garder le texte lisible au-dessus des lignes */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/40 lg:to-transparent" />
      </div>

      {/* Logo révélé par les lignes */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${target.x * 100}%`, top: `${target.y * 100}%`, y: logoY, opacity: fade }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 -m-10 rounded-[40%] bg-cyan/10 blur-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1.2 }}
          />
          <Logo
            draw
            delay={0.9}
            className="relative w-[min(46vw,220px)] text-paper drop-shadow-[0_0_24px_rgba(101,230,255,0.35)] lg:w-[min(28vw,420px)]"
          />
          <motion.p
            className="label mt-5 hidden text-center text-[0.68rem] text-paper/50 lg:block"
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.32em' }}
            transition={{ delay: 1.8, duration: 1.2, ease }}
          >
            Électricité · Climatisation · 66
          </motion.p>
        </div>
      </motion.div>

      <motion.div className="container-x relative" style={{ opacity: fade }}>
        <div className="lg:max-w-[58%]">
          <motion.p
            className="label mb-6 flex items-center gap-3 text-cyan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-[pulse-dot_2s_ease-in-out_infinite] rounded-full bg-cyan" />
            </span>
            Électricité & climatisation · Perpignan · 66
          </motion.p>

          <SplitText
            as="h1"
            id="hero-title"
            immediate
            delay={0.35}
            stagger={0.07}
            className="text-display text-[clamp(2.3rem,10vw,3.6rem)] sm:text-[clamp(3rem,7vw,4.4rem)] lg:text-[clamp(3.4rem,4.9vw,5.4rem)]"
            lineClassName={(i) => (i === 1 ? 'text-paper/45' : 'text-paper')}
            lines={[
              ['L’ÉNERGIE', <>MAÎTRISÉE<span className="text-volt">.</span></>],
              ['LE', 'CONFORT', 'PENSÉ', 'POUR', <>VOUS<span className="text-cyan">.</span></>],
            ]}
          />

          <motion.p
            className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-paper/70 lg:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease }}
          >
            Électricité générale et climatisation à Perpignan et dans les Pyrénées-Orientales. Des solutions adaptées à
            vos projets, en neuf comme en rénovation.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9, ease }}
          >
            <Button to="/contact#devis">Parler de mon projet</Button>
            <Button to="/realisations" variant="ghost">
              Explorer nos réalisations
            </Button>
            <a
              href={company.phoneHref}
              className="group flex items-center justify-center gap-3 px-2 py-3 font-mono text-sm text-paper/80 transition-colors hover:text-cyan sm:ml-3"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors group-hover:border-cyan">
                <PhoneIcon className="h-3.5 w-3.5" />
              </span>
              {company.phone}
            </a>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 hidden items-end justify-between border-t border-line pt-5 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <a href="#expertises" className="group flex items-center gap-4 text-paper/60 hover:text-paper">
            <span className="relative h-10 w-px overflow-hidden bg-paper/15">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-cyan" />
            </span>
            <span className="label">Découvrir</span>
          </a>
          <p className="label text-paper/40">42°41′ N — 2°53′ E</p>
          <p className="label text-paper/40">Neuf · Rénovation · Dépannage</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
