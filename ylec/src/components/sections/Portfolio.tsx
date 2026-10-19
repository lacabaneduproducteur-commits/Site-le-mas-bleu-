import { asset } from '../../lib/asset'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { categories, placeholderSlots, projects, type Project, type ProjectCategory } from '../../content/projects'
import { Arrow, Button } from '../Button'
import { Eyebrow, Reveal, SplitText } from '../Reveal'

// Grille éditoriale asymétrique : le motif se répète tous les 6 éléments.
const layout = [
  'lg:col-span-7 aspect-[4/3] lg:aspect-[16/11]',
  'lg:col-span-5 aspect-[4/5] lg:mt-24',
  'lg:col-span-5 aspect-[4/5]',
  'lg:col-span-7 aspect-[4/3] lg:aspect-[16/11] lg:-mt-24',
  'lg:col-span-6 aspect-[4/3]',
  'lg:col-span-6 aspect-[4/3] lg:mt-16',
]

type Filter = 'Tout' | ProjectCategory

export function Portfolio({ limit, headingLevel = 'h2', intro = true }: { limit?: number; headingLevel?: 'h1' | 'h2'; intro?: boolean }) {
  const [filter, setFilter] = useState<Filter>('Tout')
  const [open, setOpen] = useState<Project | null>(null)
  const hasProjects = projects.length > 0
  const close = useCallback(() => setOpen(null), [])

  const items = hasProjects
    ? projects.filter((p) => filter === 'Tout' || p.categories.includes(filter))
    : placeholderSlots.filter((p) => filter === 'Tout' || p.categories.includes(filter))
  const shown = limit ? items.slice(0, limit) : items

  return (
    <section id="realisations" data-section="Réalisations" className="relative py-28 lg:py-40" aria-labelledby="realisations-title">
      <div className="container-x">
        {intro && (
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>Nos réalisations</Eyebrow>
              <SplitText
                as={headingLevel}
                id="realisations-title"
                className="text-display mt-6 text-[clamp(2.2rem,5.4vw,5rem)]"
                lineClassName={(i) => (i === 1 ? 'text-paper/45' : '')}
                lines={['Le travail soigné', 'se voit.']}
              />
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
              <p className="text-lg leading-relaxed text-paper/65">
                Installations de climatisation, tableaux électriques, raccordements et éclairages LED&nbsp;: un aperçu de
                chantiers réalisés dans les Pyrénées-Orientales.
              </p>
            </Reveal>
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-2" role="group" aria-label="Filtrer les réalisations">
          {(['Tout', ...categories] as Filter[]).map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`relative isolate rounded-full border px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase transition-colors ${
                filter === c ? 'border-volt text-white' : 'border-line text-paper/60 hover:border-paper/30 hover:text-paper'
              }`}
            >
              {filter === c && (
                <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-volt" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
              )}
              {c}
            </button>
          ))}
        </div>

        {!hasProjects && (
          <p className="mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-paper/20 p-4 text-sm text-paper/60">
            <span className="label shrink-0 text-cyan">Galerie</span>
            Les photographies des chantiers réalisés par YLEC sont en cours d’intégration. Les emplacements ci-dessous
            seront remplacés par les vraies réalisations.
          </p>
        )}

        <motion.ul layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {shown.map((item, i) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={layout[i % layout.length].replace(/(lg:)?aspect-\S+/g, '')}
              >
                {'photos' in item ? (
                  <ProjectTile project={item} ratio={layout[i % layout.length]} onOpen={() => setOpen(item)} />
                ) : (
                  <PlaceholderTile label={item.label} cats={item.categories} ratio={layout[i % layout.length]} />
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {shown.length === 0 && <p className="mt-10 text-paper/60">Aucune réalisation dans cette catégorie pour le moment.</p>}

        {limit && (
          <Reveal className="mt-16 flex justify-center">
            <Button to="/realisations" variant="ghost">
              Toutes les réalisations
            </Button>
          </Reveal>
        )}
      </div>

      <Lightbox project={open} onClose={close} />
    </section>
  )
}

function ratioOnly(cls: string) {
  return (cls.match(/(lg:)?aspect-\S+/g) ?? []).join(' ')
}

function ProjectTile({ project, ratio, onOpen }: { project: Project; ratio: string; onOpen: () => void }) {
  const cover = project.photos[0]
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative block w-full overflow-hidden rounded-[1.6rem] bg-coal text-left ${ratioOnly(ratio)}`}
      aria-label={`Voir la réalisation : ${project.title}`}
    >
      {cover && (
        <img
          src={asset(cover.src)}
          alt={cover.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 lg:p-8">
        <span className="translate-y-3 opacity-80 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="label block text-cyan">{project.categories.join(' · ')}</span>
          <span className="font-wide mt-2 block text-xl font-semibold lg:text-2xl">{project.title}</span>
        </span>
        <span className="grid h-12 w-12 shrink-0 -rotate-45 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100 group-focus-visible:opacity-100">
          <Arrow />
        </span>
      </span>
      <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-volt to-cyan transition-transform duration-700 group-hover:scale-x-100" />
    </button>
  )
}

function PlaceholderTile({ label, cats, ratio }: { label: string; cats: ProjectCategory[]; ratio: string }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-[1.6rem] border border-dashed border-paper/15 bg-coal/60 ${ratioOnly(ratio)}`}>
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <svg className="absolute inset-0 h-full w-full text-paper/10" aria-hidden="true">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
        <p className="label text-paper/40">{cats.join(' · ')}</p>
        <p className="font-wide mt-2 text-xl font-semibold text-paper/70">{label}</p>
      </div>
      <span className="label absolute top-5 right-5 rounded-full border border-paper/15 bg-ink/80 px-3 py-1.5 text-[0.6rem] text-paper/60">
        Photo à intégrer
      </span>
    </div>
  )
}

function Lightbox({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [index, setIndex] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return
    setIndex(0)
    returnFocus.current = document.activeElement as HTMLElement
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % project.photos.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + project.photos.length) % project.photos.length)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
      returnFocus.current?.focus()
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-[80] overflow-y-auto bg-ink/95 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="container-x grid min-h-full gap-10 py-24 lg:grid-cols-12 lg:items-center">
            <div className="relative lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={project.photos[index]?.src}
                  src={asset(project.photos[index]?.src ?? '')}
                  alt={project.photos[index]?.alt}
                  className="max-h-[72vh] w-full rounded-2xl object-contain"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>
              {project.photos.length > 1 && (
                <div className="mt-4 flex items-center justify-between">
                  <button
                    type="button"
                    className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-cyan"
                    onClick={() => setIndex((i) => (i - 1 + project.photos.length) % project.photos.length)}
                    aria-label="Photo précédente"
                  >
                    <Arrow className="h-4 w-4 rotate-180" />
                  </button>
                  <p className="font-mono text-sm text-paper/60" aria-live="polite">
                    {index + 1} / {project.photos.length}
                  </p>
                  <button
                    type="button"
                    className="grid h-12 w-12 place-items-center rounded-full border border-line hover:border-cyan"
                    onClick={() => setIndex((i) => (i + 1) % project.photos.length)}
                    aria-label="Photo suivante"
                  >
                    <Arrow className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="lg:col-span-4">
              <p className="label text-cyan">{project.categories.join(' · ')}</p>
              <h3 id="lightbox-title" className="text-display mt-4 text-4xl">
                {project.title}
              </h3>
              <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-sm">
                <div>
                  <dt className="label text-mute">Prestation</dt>
                  <dd className="mt-1 text-paper/85">{project.service}</dd>
                </div>
                {project.place && (
                  <div>
                    <dt className="label text-mute">Secteur</dt>
                    <dd className="mt-1 text-paper/85">{project.place}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-6 leading-relaxed text-paper/70">{project.description}</p>
              <div className="mt-8">
                <Button to="/contact#devis">Un projet similaire ?</Button>
              </div>
            </div>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="fixed top-5 right-5 grid h-12 w-12 place-items-center rounded-full border border-line bg-ink hover:border-cyan"
            aria-label="Fermer"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
              <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
