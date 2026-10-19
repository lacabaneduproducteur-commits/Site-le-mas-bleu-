import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'
import { company, expertises, type Expertise } from '../../content/site'
import { media } from '../../content/media'
import { usePointerHalo } from '../../lib/hooks'
import { Arrow, PhoneIcon } from '../Button'
import { ClimIllustration, PanelIllustration } from '../Illustrations'
import { Eyebrow, Reveal, SplitText } from '../Reveal'

export function Expertises() {
  return (
    <section id="expertises" data-section="Expertises" className="relative py-28 lg:py-40" aria-labelledby="expertises-title">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Nos expertises</Eyebrow>
            <SplitText
              id="expertises-title"
              className="text-display mt-6 text-[clamp(2.2rem,5.4vw,5rem)]"
              lineClassName={(i) => (i === 1 ? 'text-paper/45' : '')}
              lines={['Deux métiers.', 'Une même exigence.']}
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <p className="text-lg leading-relaxed text-paper/65">
              Électricité générale et climatisation, pour les particuliers comme pour les professionnels, en construction
              neuve comme en rénovation.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-12 lg:gap-8">
          <ExpertiseCard e={expertises[0]} className="lg:col-span-7" tall />
          <ExpertiseCard e={expertises[1]} className="lg:col-span-5 lg:mt-40" />
        </div>

        <Reveal className="mt-8">
          <div className="flex flex-col gap-6 rounded-3xl border border-line bg-coal/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-5">
              <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-volt/15 text-cyan">
                <BoltIcon />
              </span>
              <div>
                <p className="font-wide text-lg font-semibold">Une panne, un dysfonctionnement ?</p>
                <p className="mt-1 text-paper/60">Dépannage électrique et dépannage de climatisation à Perpignan et dans le 66.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-5 sm:shrink-0">
              <Link to="/depannage" className="group flex items-center gap-2 text-sm font-semibold hover:text-cyan">
                Le dépannage <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
              <a href={company.phoneHref} className="flex items-center gap-2 font-mono text-sm text-cyan hover:text-white">
                <PhoneIcon className="h-3.5 w-3.5" /> {company.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ExpertiseCard({ e, className = '', tall = false }: { e: Expertise; className?: string; tall?: boolean }) {
  const onMove = usePointerHalo<HTMLElement>()
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 120, damping: 20 })
  const sy = useSpring(my, { stiffness: 120, damping: 20 })
  const tx = useTransform(sx, (v) => v * 18)
  const ty = useTransform(sy, (v) => v * 14)
  const photo = media[e.slug]

  return (
    <Reveal className={className}>
      <article
        onPointerMove={(ev) => {
          onMove(ev)
          if (reduce) return
          const r = ev.currentTarget.getBoundingClientRect()
          mx.set((ev.clientX - r.left) / r.width - 0.5)
          my.set((ev.clientY - r.top) / r.height - 0.5)
        }}
        onPointerLeave={() => {
          mx.set(0)
          my.set(0)
        }}
        className="halo group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-coal transition-colors duration-500 hover:border-volt/50"
      >
        <div className={`relative overflow-hidden ${tall ? 'aspect-[16/11]' : 'aspect-[4/3]'} bg-ink`}>
          <div className="bg-blueprint absolute inset-0 opacity-80" aria-hidden="true" />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-volt/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            aria-hidden="true"
          />
          <motion.div className="absolute inset-0 grid place-items-center" style={{ x: tx, y: ty }}>
            {photo ? (
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full scale-110 object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.16]"
              />
            ) : e.slug === 'electricite' ? (
              <PanelIllustration className="w-[78%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
            ) : (
              <ClimIllustration className="w-[84%] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]" />
            )}
          </motion.div>
          <span className="text-display absolute top-5 left-6 text-[4.5rem] text-paper/[0.07] lg:text-[6rem]" aria-hidden="true">
            {e.index}
          </span>
          {/* Trait lumineux qui parcourt la carte au survol */}
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-volt via-cyan to-transparent transition-transform duration-700 ease-out group-hover:scale-x-100"
          />
        </div>

        <div className="flex flex-1 flex-col p-7 lg:p-10">
          <p className="label text-mute">{e.kicker}</p>
          <h3 className="text-display mt-4 text-[clamp(1.9rem,3.4vw,3rem)]">{e.title}</h3>
          <p className="mt-4 max-w-lg leading-relaxed text-paper/70">{e.intro}</p>
          <ul className="mt-6 grid gap-x-6 gap-y-2 text-sm text-paper/60 sm:grid-cols-2">
            {e.services.slice(0, tall ? 6 : 4).map((s) => (
              <li key={s} className="flex gap-2.5">
                <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8" />
          <Link
            to={`/${e.slug}`}
            className="flex items-center justify-between gap-4 border-t border-line pt-6 text-sm font-semibold tracking-[0.12em] uppercase transition-colors hover:text-cyan"
          >
            Découvrir l’expertise
            <span className="grid h-11 w-11 place-items-center rounded-full border border-line transition-all duration-300 group-hover:border-volt group-hover:bg-volt group-hover:text-white">
              <Arrow className="h-3.5 w-3.5" />
            </span>
            <span className="absolute inset-0" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  )
}

export function BoltIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" strokeLinejoin="round" />
    </svg>
  )
}
