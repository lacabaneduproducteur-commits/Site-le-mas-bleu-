import { motion } from 'motion/react'
import { commitments, company } from '../../content/site'
import { media } from '../../content/media'
import { Button } from '../Button'
import { Logo } from '../Logo'
import { Eyebrow, Reveal, SplitText } from '../Reveal'

export function Company({ withLink = true }: { withLink?: boolean }) {
  return (
    <section
      id="entreprise"
      data-section="L’entreprise"
      className="relative overflow-hidden bg-paper py-28 text-ink lg:py-40"
      aria-labelledby="entreprise-title"
    >
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Eyebrow className="!text-volt [&>span]:!bg-volt">L’entreprise</Eyebrow>
            <SplitText
              id="entreprise-title"
              className="text-display mt-6 text-[clamp(1.9rem,3.6vw,3.6rem)]"
              lineClassName={(i) => (i === 1 ? 'text-ink/40' : '')}
              lines={['Une entreprise locale,', 'un accompagnement personnalisé.']}
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-16">
            <Reveal>
              <p className="text-xl leading-relaxed text-ink/80 lg:text-[1.35rem]">
                Chez YLEC, chaque projet commence par l’écoute de vos besoins. Nous vous accompagnons dans vos travaux
                d’électricité et de climatisation, en neuf comme en rénovation, avec des solutions adaptées à votre
                logement ou à vos locaux professionnels.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-ink/65">
                Notre priorité&nbsp;: un travail soigné, des conseils clairs et une installation pensée pour votre confort.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex items-center gap-5 border-t border-ink/10 pt-6">
                {media.entreprise ? (
                  <img
                    src={media.entreprise.src}
                    alt={media.entreprise.alt}
                    loading="lazy"
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-ink">
                    <Logo className="w-9 text-paper" title="YLEC" />
                  </span>
                )}
                <div>
                  <p className="font-wide text-lg font-semibold">{company.manager}</p>
                  <p className="label text-ink/50">Dirigeant · {company.name}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <ol className="mt-20 border-t border-ink/15 lg:mt-32">
          {commitments.map((c, i) => (
            <Commitment key={c} index={i} text={c} />
          ))}
        </ol>

        {withLink && (
          <Reveal className="mt-12">
            <Button to="/entreprise" variant="primary">
              Découvrir l’entreprise
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  )
}

function Commitment({ index, text }: { index: number; text: string }) {
  return (
    <motion.li
      className="group relative grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-ink/15 py-7 sm:grid-cols-[6rem_1fr] lg:py-9"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute bottom-[-1px] left-0 h-[2px] w-full origin-left bg-volt"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] } } }}
      />
      <span className="font-mono text-sm text-volt">0{index + 1}</span>
      <motion.p
        className="text-display text-[clamp(1.4rem,3.6vw,3.2rem)] transition-transform duration-500 group-hover:translate-x-2"
        variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
      >
        {text}
      </motion.p>
    </motion.li>
  )
}
