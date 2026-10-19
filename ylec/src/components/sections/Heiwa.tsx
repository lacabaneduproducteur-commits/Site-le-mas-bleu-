import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { company } from '../../content/site'
import { media } from '../../content/media'
import { Button } from '../Button'
import { OutdoorUnitIllustration } from '../Illustrations'
import { Eyebrow, Reveal, SplitText } from '../Reveal'

export function Heiwa() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <section ref={ref} data-section="Partenaire" className="relative overflow-hidden py-28 lg:py-40" aria-labelledby="heiwa-title">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-coal to-ink">
            <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
            <motion.div className="absolute inset-0 grid place-items-center" style={{ y }}>
              {media.heiwa ? (
                <img src={media.heiwa.src} alt={media.heiwa.alt} loading="lazy" className="h-[116%] w-full object-cover" />
              ) : (
                <OutdoorUnitIllustration className="w-[72%] drop-shadow-[0_30px_60px_rgba(57,123,255,0.25)]" />
              )}
            </motion.div>
            <div className="absolute top-6 left-6 flex items-center gap-3 rounded-full border border-line bg-ink/70 px-4 py-2 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
              <span className="label text-paper/80">Ambassadeur Heiwa</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Eyebrow>Partenaire</Eyebrow>
          <SplitText
            id="heiwa-title"
            className="text-display mt-6 text-[clamp(1.9rem,3.8vw,3.5rem)]"
            lineClassName={(i) => (i === 1 ? 'text-paper/45' : '')}
            lines={['Le confort thermique,', 'avec un partenaire de confiance.']}
          />
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg leading-relaxed text-paper/70">
              YLEC est ambassadeur de la marque Heiwa et vous accompagne dans le choix de solutions de climatisation adaptées
              à vos espaces et à vos besoins. De l’étude du projet à la mise en service, chaque installation est pensée pour
              allier confort, performance et intégration soignée.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-9 flex flex-wrap gap-3">
            <Button href={company.heiwaUrl} external variant="ghost">
              Découvrir Heiwa
            </Button>
            <Button to="/climatisation" variant="line">
              Notre expertise climatisation
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
