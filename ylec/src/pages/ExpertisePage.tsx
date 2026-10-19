import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Button, PhoneIcon } from '../components/Button'
import { ClimIllustration, PanelIllustration } from '../components/Illustrations'
import { PageHero } from '../components/PageHero'
import { Eyebrow, Reveal, SplitText } from '../components/Reveal'
import { Process } from '../components/sections/Process'
import { Heiwa } from '../components/sections/Heiwa'
import { media } from '../content/media'
import { company, expertises } from '../content/site'

const details = {
  electricite: {
    lines: [['Électricité', 'générale'], ['neuf', '&', 'rénovation.']],
    blocks: [
      {
        title: 'Construction neuve',
        text: 'Une installation électrique pensée dès la conception : répartition des circuits, emplacement des prises, des interrupteurs et des points lumineux selon vos usages.',
      },
      {
        title: 'Rénovation et modernisation',
        text: 'Mise à niveau d’une installation existante, remplacement du tableau électrique et des protections, création ou extension de circuits pour accompagner l’évolution de votre logement ou de vos locaux.',
      },
      {
        title: 'Éclairage intérieur et extérieur',
        text: 'Installation d’éclairages, dont l’éclairage LED, pour mettre en valeur vos espaces intérieurs et extérieurs.',
      },
    ],
    other: 'climatisation' as const,
  },
  climatisation: {
    lines: [['Climatisation'], ['confort', 'toute', 'l’année.']],
    blocks: [
      {
        title: 'Étude et choix de l’équipement',
        text: 'Chaque pièce, chaque local a ses contraintes. Nous étudions votre besoin pour vous orienter vers l’équipement adapté à vos espaces.',
      },
      {
        title: 'Installation et raccordement',
        text: 'Pose des unités, raccordement des équipements et intégration soignée, en maison, en appartement, en commerce ou en bureaux.',
      },
      {
        title: 'Mise en service',
        text: 'Mise en service et vérification du fonctionnement de l’installation avant de vous la remettre.',
      },
    ],
    other: 'electricite' as const,
  },
}

export function ExpertisePage({ slug }: { slug: 'electricite' | 'climatisation' }) {
  const e = expertises.find((x) => x.slug === slug)!
  const d = details[slug]
  const other = expertises.find((x) => x.slug === d.other)!
  const photo = media[slug]

  return (
    <>
      <PageHero crumb={e.title} eyebrow={`${e.index} — ${e.kicker}`} lines={d.lines} intro={<p>{e.intro}</p>}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button to={`/contact?type=${slug}#devis`}>Demander un devis</Button>
          <a href={company.phoneHref} className="flex items-center gap-3 px-2 py-3 font-mono text-sm text-paper/80 hover:text-cyan">
            <PhoneIcon className="h-4 w-4" /> {company.phone}
          </a>
        </div>
      </PageHero>

      <section data-section="Prestations" className="py-24 lg:py-32" aria-labelledby="prestations-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>Prestations</Eyebrow>
              <SplitText
                id="prestations-title"
                className="text-display mt-6 text-[clamp(2rem,4.4vw,4rem)]"
                lines={['Ce que nous', 'réalisons.']}
                lineClassName={(i) => (i === 1 ? 'text-paper/45' : '')}
              />
              <Reveal className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[2rem] border border-line bg-coal">
                <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
                <div className="group absolute inset-0 grid place-items-center">
                  {photo ? (
                    <img src={photo.src} alt={photo.alt} loading="lazy" className="h-full w-full object-cover" />
                  ) : slug === 'electricite' ? (
                    <PanelIllustration className="w-[80%]" />
                  ) : (
                    <ClimIllustration className="w-[86%]" />
                  )}
                </div>
              </Reveal>
            </div>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {e.services.map((s, i) => (
              <motion.li
                key={s}
                className="group relative flex items-baseline gap-6 border-b border-line py-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-wide text-xl font-medium transition-transform duration-500 group-hover:translate-x-2 lg:text-2xl">{s}</span>
                <span className="absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-volt transition-transform duration-700 group-hover:scale-x-100" />
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section data-section="Approche" className="bg-paper py-24 text-ink lg:py-32" aria-labelledby="approche-title">
        <div className="container-x">
          <Eyebrow className="!text-volt [&>span]:!bg-volt">Notre approche</Eyebrow>
          <h2 id="approche-title" className="sr-only">
            Notre approche
          </h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 md:grid-cols-3">
            {d.blocks.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="bg-paper p-8 lg:p-12">
                <p className="font-mono text-sm text-volt">0{i + 1}</p>
                <h3 className="font-wide mt-6 text-2xl font-semibold tracking-tight">{b.title}</h3>
                <p className="mt-4 leading-relaxed text-ink/65">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {slug === 'climatisation' && <Heiwa />}
      <Process />

      <section className="pb-24 lg:pb-32" aria-label="Autres expertises">
        <div className="container-x grid gap-4 md:grid-cols-2">
          <Link
            to={`/${other.slug}`}
            className="group flex items-center justify-between gap-6 rounded-[2rem] border border-line p-8 transition-colors hover:border-volt/60 lg:p-10"
          >
            <span>
              <span className="label text-mute">Autre expertise</span>
              <span className="text-display mt-3 block text-3xl">{other.title}</span>
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors group-hover:border-volt group-hover:bg-volt">
              →
            </span>
          </Link>
          <Link
            to="/depannage"
            className="group flex items-center justify-between gap-6 rounded-[2rem] border border-line p-8 transition-colors hover:border-volt/60 lg:p-10"
          >
            <span>
              <span className="label text-mute">Besoin urgent</span>
              <span className="text-display mt-3 block text-3xl">Dépannage</span>
            </span>
            <span className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors group-hover:border-volt group-hover:bg-volt">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  )
}
