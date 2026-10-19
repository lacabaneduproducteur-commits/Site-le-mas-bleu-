import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { steps } from '../../content/site'
import { Eyebrow, Reveal, SplitText } from '../Reveal'

export function Process() {
  const list = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 70%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section data-section="Méthode" className="relative py-28 lg:py-40" aria-labelledby="methode-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow>Notre méthode</Eyebrow>
            <SplitText
              id="methode-title"
              className="text-display mt-6 text-[clamp(2.2rem,5vw,4.6rem)]"
              lineClassName={(i) => (i === 1 ? 'text-paper/45' : '')}
              lines={['Un projet clair,', 'étape par étape.']}
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/65">
                Du premier échange à la mise en service, vous savez toujours où en est votre projet.
              </p>
            </Reveal>
          </div>
        </div>

        <ol ref={list} className="relative lg:col-span-6 lg:col-start-7">
          {/* Ligne électrique qui se construit au défilement */}
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[19px] w-px bg-paper/10" />
          <motion.span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-gradient-to-b from-cyan via-volt to-volt shadow-[0_0_12px_rgba(101,230,255,0.8)]"
            style={{ scaleY: progress }}
          />
          {steps.map((s, i) => (
            <Step key={s.n} step={s} index={i} total={steps.length} progress={progress} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function Step({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof steps)[number]
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const at = index / (total - 1)
  const lit = useTransform(progress, [Math.max(0, at - 0.08), at], [0, 1])
  const glow = useTransform(lit, (v) => `0 0 ${v * 24}px rgba(101,230,255,${v * 0.8})`)

  return (
    <li className="relative pb-16 pl-16 last:pb-0 lg:pb-24">
      <span className="absolute top-0 left-0 grid h-10 w-10 place-items-center rounded-full border border-paper/15 bg-ink">
        <motion.span className="h-3 w-3 rounded-full bg-cyan" style={{ opacity: lit, scale: lit, boxShadow: glow }} />
      </span>
      <Reveal>
        <p className="font-mono text-sm text-cyan">{step.n}</p>
        <h3 className="font-wide mt-3 text-2xl font-semibold tracking-tight lg:text-[1.85rem]">{step.title}</h3>
        <p className="mt-4 max-w-lg leading-relaxed text-paper/60">{step.text}</p>
      </Reveal>
    </li>
  )
}
