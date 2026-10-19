import { company } from '../../content/site'
import { MailIcon, PhoneIcon } from '../Button'
import { QuoteForm } from '../QuoteForm'
import { Eyebrow, Reveal, SplitText } from '../Reveal'

export function Contact({ headingLevel = 'h2' }: { headingLevel?: 'h1' | 'h2' }) {
  return (
    <section id="devis" data-section="Contact" className="relative overflow-hidden py-28 lg:py-40" aria-labelledby="devis-title">
      <div aria-hidden="true" className="absolute top-0 left-1/2 h-[480px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt/15 blur-[140px]" />
      <div className="container-x relative">
        <Eyebrow>Demande de devis</Eyebrow>
        <SplitText
          as={headingLevel}
          id="devis-title"
          className="text-display mt-6 text-[clamp(2.4rem,6.4vw,6rem)]"
          lineClassName={(i) => (i === 1 ? 'text-paper/45' : '')}
          lines={[['Votre', 'projet'], ['commence', <>ici<span className="text-volt">.</span></>]]}
        />
        <Reveal>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/65">
            Une installation électrique, une rénovation ou un projet de climatisation&nbsp;? Parlons-en.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div className="rounded-[2rem] border border-line bg-coal/70 p-6 backdrop-blur sm:p-10">
              <QuoteForm />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <ContactDetails />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function ContactDetails() {
  return (
    <div className="grid gap-10">
      <div>
        <p className="label text-mute">Téléphone</p>
        <a href={company.phoneHref} className="group mt-3 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-volt text-white transition-shadow group-hover:shadow-[0_8px_30px_-6px_rgba(57,123,255,0.9)]">
            <PhoneIcon />
          </span>
          <span className="font-wide text-2xl font-semibold transition-colors group-hover:text-cyan">{company.phone}</span>
        </a>
      </div>
      <div>
        <p className="label text-mute">E-mail</p>
        <a href={`mailto:${company.email}`} className="group mt-3 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-line transition-colors group-hover:border-cyan">
            <MailIcon />
          </span>
          <span className="text-lg break-all transition-colors group-hover:text-cyan">{company.email}</span>
        </a>
      </div>
      <div>
        <p className="label text-mute">Horaires</p>
        <dl className="mt-3 divide-y divide-line border-y border-line">
          {company.hours.map((h) => (
            <div key={h.days} className="flex justify-between gap-4 py-3 text-sm">
              <dt className="text-paper/60">{h.days}</dt>
              <dd className="font-mono text-paper">{h.time}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <p className="label text-mute">Zone d’intervention</p>
        <p className="mt-3 leading-relaxed text-paper/75">{company.area}</p>
        <p className="mt-2 text-sm text-paper/50">Particuliers et professionnels.</p>
      </div>
    </div>
  )
}
