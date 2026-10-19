import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button, PhoneIcon } from '../components/Button'
import { Hero } from '../components/Hero'
import { PageHero } from '../components/PageHero'
import { Eyebrow, Reveal, SplitText } from '../components/Reveal'
import { Company } from '../components/sections/Company'
import { Contact, ContactDetails } from '../components/sections/Contact'
import { BoltIcon, Expertises } from '../components/sections/Expertises'
import { Heiwa } from '../components/sections/Heiwa'
import { Portfolio } from '../components/sections/Portfolio'
import { Process } from '../components/sections/Process'
import { company } from '../content/site'

export function Home() {
  return (
    <>
      <Hero />
      <Expertises />
      <Company />
      <Process />
      <Heiwa />
      <Portfolio limit={6} />
      <Contact />
    </>
  )
}

export function Depannage() {
  const cases = [
    {
      title: 'Dépannage électrique',
      items: [
        'Coupure de courant sur tout ou partie de l’installation',
        'Disjoncteur ou différentiel qui se déclenche',
        'Prise, interrupteur ou point lumineux qui ne fonctionne plus',
        'Tableau électrique ou protections à contrôler',
      ],
      link: { to: '/electricite', label: 'Électricité générale' },
    },
    {
      title: 'Dépannage de climatisation',
      items: [
        'Climatisation qui ne démarre plus',
        'Appareil qui ne refroidit ou ne chauffe plus correctement',
        'Fonctionnement anormal d’une unité intérieure ou extérieure',
        'Vérification du fonctionnement de l’installation',
      ],
      link: { to: '/climatisation', label: 'Climatisation' },
    },
  ]
  return (
    <>
      <PageHero
        crumb="Dépannage"
        eyebrow="Électricité · Climatisation · Pyrénées-Orientales"
        lines={[['Une', 'panne', '?'], ['Parlons-en', 'rapidement.']]}
        intro={
          <p>
            YLEC intervient en dépannage électrique et en dépannage de climatisation à Perpignan et dans les
            Pyrénées-Orientales, pour les particuliers comme pour les professionnels.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={company.phoneHref} icon={<PhoneIcon />}>
            Appeler le {company.phone}
          </Button>
          <Button to="/contact#devis" variant="ghost">
            Décrire mon problème
          </Button>
        </div>
      </PageHero>

      <section data-section="Situations" className="py-24 lg:py-32" aria-labelledby="situations-title">
        <div className="container-x">
          <Eyebrow>Situations courantes</Eyebrow>
          <SplitText
            id="situations-title"
            className="text-display mt-6 text-[clamp(2rem,4.4vw,4rem)]"
            lines={['Nous diagnostiquons,', 'puis nous intervenons.']}
            lineClassName={(i) => (i === 1 ? 'text-paper/45' : '')}
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {cases.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08} className="halo rounded-[2rem] border border-line bg-coal p-8 lg:p-12">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-volt/15 text-cyan">
                  <BoltIcon />
                </span>
                <h3 className="text-display mt-8 text-3xl">{c.title}</h3>
                <ul className="mt-6 grid gap-3 text-paper/70">
                  {c.items.map((it) => (
                    <li key={it} className="flex gap-3">
                      <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-volt" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
                <Link to={c.link.to} className="mt-8 inline-block text-sm font-semibold text-cyan hover:text-white">
                  Voir l’expertise {c.link.label} →
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <div className="grid gap-6 rounded-[2rem] border border-line p-8 md:grid-cols-[1fr_auto] md:items-center lg:p-10">
              <div>
                <p className="label text-mute">Horaires</p>
                <p className="mt-3 text-paper/80">
                  {company.hours.map((h) => `${h.days} : ${h.time}`).join(' · ')}
                </p>
                <p className="mt-2 text-sm text-paper/50">
                  Les délais d’intervention dépendent de la situation et de la localisation : appelez-nous pour en parler.
                </p>
              </div>
              <Button href={company.phoneHref} icon={<PhoneIcon />}>
                {company.phone}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
      <Contact />
    </>
  )
}

export function Realisations() {
  return (
    <>
      <PageHero
        crumb="Réalisations"
        eyebrow="Portfolio · Pyrénées-Orientales"
        lines={['Nos', 'réalisations.']}
        intro={
          <p>
            Installations de climatisation, tableaux électriques, raccordements et éclairages LED&nbsp;: découvrez le travail
            de YLEC sur le terrain.
          </p>
        }
      />
      <div className="-mt-20 lg:-mt-28">
        <Portfolio intro={false} />
      </div>
      <Contact />
    </>
  )
}

export function Entreprise() {
  return (
    <>
      <PageHero
        crumb="L’entreprise"
        eyebrow={`${company.name} · ${company.manager}`}
        lines={[['YLEC,'], ['l’artisan', 'de', 'votre', 'confort.']]}
        intro={
          <p>
            Entreprise locale basée à Perpignan, YLEC intervient en électricité générale et en climatisation dans les
            Pyrénées-Orientales, auprès des particuliers et des professionnels.
          </p>
        }
      />
      <Company withLink={false} />
      <Process />
      <Heiwa />
      <Contact />
    </>
  )
}

export function ContactPage() {
  return (
    <>
      <div className="pt-16">
        <Contact headingLevel="h1" />
      </div>
    </>
  )
}

function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumb={title} eyebrow={company.name} lines={[title.split(' ')]} />
      <section className="pb-28">
        <div className="container-x max-w-3xl space-y-10 leading-relaxed text-paper/75 [&_a]:text-cyan [&_a]:underline [&_h2]:font-wide [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-paper">
          {children}
        </div>
      </section>
    </>
  )
}

const Todo = ({ children }: { children: ReactNode }) => (
  <span className="rounded bg-volt/15 px-1.5 py-0.5 font-mono text-sm text-cyan">{children}</span>
)

export function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales">
      <div>
        <h2>Éditeur du site</h2>
        <p className="mt-3">
          {company.name}
          <br />
          Responsable de la publication : {company.manager}
          <br />
          Adresse : <Todo>adresse du siège à compléter</Todo>, Perpignan
          <br />
          SIRET : <Todo>à compléter</Todo>
          <br />
          Téléphone : <a href={company.phoneHref}>{company.phone}</a> · E-mail : <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </div>
      <div>
        <h2>Hébergement</h2>
        <p className="mt-3">
          <Todo>Nom, adresse et téléphone de l’hébergeur à compléter</Todo>
        </p>
      </div>
      <div>
        <h2>Propriété intellectuelle</h2>
        <p className="mt-3">
          L’ensemble des contenus de ce site (textes, visuels, photographies, logo) est la propriété de {company.name} ou de
          leurs auteurs respectifs. Toute reproduction sans autorisation est interdite. La marque Heiwa appartient à son
          propriétaire.
        </p>
      </div>
      <div>
        <h2>Données personnelles</h2>
        <p className="mt-3">
          Voir la <Link to="/confidentialite">politique de confidentialité</Link>.
        </p>
      </div>
    </LegalLayout>
  )
}

export function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité">
      <div>
        <h2>Responsable du traitement</h2>
        <p className="mt-3">
          {company.name}, représentée par {company.manager}. Contact : <a href={`mailto:${company.email}`}>{company.email}</a>.
        </p>
      </div>
      <div>
        <h2>Données collectées</h2>
        <p className="mt-3">
          Via le formulaire de demande de devis : nom et prénom, téléphone, adresse e-mail, type de projet, type de bâtiment,
          commune du chantier, description du besoin et, le cas échéant, les fichiers joints.
        </p>
      </div>
      <div>
        <h2>Finalité et base légale</h2>
        <p className="mt-3">
          Ces données servent uniquement à répondre à votre demande et à établir un devis. Le traitement repose sur votre
          consentement et sur les mesures précontractuelles prises à votre demande. Elles ne sont ni vendues, ni cédées.
        </p>
      </div>
      <div>
        <h2>Destinataires et sous-traitants</h2>
        <p className="mt-3">
          Les demandes sont transmises à YLEC par l’intermédiaire du service d’envoi de formulaire <Todo>nom du service à compléter</Todo>.
        </p>
      </div>
      <div>
        <h2>Durée de conservation</h2>
        <p className="mt-3">
          Les demandes sans suite sont conservées au maximum <Todo>durée à confirmer, ex. 3 ans</Todo> après le dernier contact.
        </p>
      </div>
      <div>
        <h2>Vos droits</h2>
        <p className="mt-3">
          Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de limitation sur vos données. Pour
          l’exercer, écrivez à <a href={`mailto:${company.email}`}>{company.email}</a>. Vous pouvez également adresser une
          réclamation à la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
        </p>
      </div>
      <div>
        <h2>Cookies</h2>
        <p className="mt-3">
          Ce site n’utilise pas de cookies publicitaires ni d’outil de mesure d’audience. Les polices de caractères sont
          hébergées sur le site lui-même.
        </p>
      </div>
    </LegalLayout>
  )
}

export function NotFound() {
  return (
    <>
      <PageHero crumb="404" eyebrow="Erreur 404" lines={[['Court-circuit.'], ['Page', 'introuvable.']]}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/">Retour à l’accueil</Button>
          <Button to="/contact" variant="ghost">
            Nous contacter
          </Button>
        </div>
      </PageHero>
      <div className="container-x pb-24">
        <ContactDetails />
      </div>
    </>
  )
}
