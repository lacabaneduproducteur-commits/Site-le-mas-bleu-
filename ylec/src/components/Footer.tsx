import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { company } from '../content/site'
import { Arrow, PhoneIcon } from './Button'
import { Logo } from './Logo'

// Circuit décoratif : les pistes s'allument progressivement à l'apparition du pied de page.
const traces = [
  'M0 120 H180 L220 80 H420 L460 120 H700',
  'M0 160 H120 L160 200 H380 L420 160 H560 L600 120 H700',
  'M60 0 V40 L100 80 H180',
  'M520 0 V60 L480 100 V120',
  'M300 240 V200 L340 160 H380',
  'M640 240 V200 L600 160 H560',
]
const nodes = [
  [180, 120],
  [420, 80],
  [380, 160],
  [560, 160],
  [100, 80],
  [480, 120],
]

function FooterCircuit() {
  return (
    <svg viewBox="0 0 700 240" className="h-full w-full" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {traces.map((d, i) => (
        <g key={d}>
          <path d={d} stroke="#F4F5F7" strokeOpacity=".07" strokeWidth="1.5" />
          <motion.path
            d={d}
            stroke="url(#ft-g)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 2.2, delay: i * 0.25, ease: [0.65, 0, 0.35, 1] }}
          />
        </g>
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="3.5"
          fill="#65E6FF"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: [0, 1, 0.5] }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.2 + i * 0.2 }}
        />
      ))}
      <defs>
        <linearGradient id="ft-g" x1="0" y1="0" x2="700" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#397BFF" />
          <stop offset="1" stopColor="#65E6FF" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const pages = [
  { label: 'Accueil', to: '/' },
  { label: 'Électricité générale', to: '/electricite' },
  { label: 'Climatisation', to: '/climatisation' },
  { label: 'Dépannage', to: '/depannage' },
  { label: 'Réalisations', to: '/realisations' },
  { label: 'L’entreprise', to: '/entreprise' },
  { label: 'Contact', to: '/contact' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink pb-28 lg:pb-10">
      {/* Appel à l'action final */}
      <div className="container-x relative py-20 lg:py-28">
        <div className="absolute inset-0 -z-0 opacity-50 [mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]">
          <FooterCircuit />
        </div>
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-display max-w-4xl text-[clamp(2.2rem,6vw,5.6rem)]">
            Parlons de <span className="text-paper/45">votre projet</span>
            <span className="text-volt">.</span>
          </p>
          <div className="flex shrink-0 flex-col gap-3 whitespace-nowrap sm:flex-row">
            <Link
              to="/contact#devis"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-volt px-7 py-4 text-xs font-semibold tracking-[0.14em] text-white uppercase transition-shadow hover:shadow-[0_10px_40px_-8px_rgba(57,123,255,0.75)]"
            >
              Demander un devis <Arrow className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={company.phoneHref}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-paper/25 px-7 py-4 font-mono text-sm hover:border-cyan hover:text-cyan"
            >
              <PhoneIcon className="h-3.5 w-3.5" /> {company.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 border-t border-line pt-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="w-32 text-paper" title="YLEC Électricité Climatisation 66" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            {company.name}. Électricité générale et climatisation, en neuf comme en rénovation, pour les particuliers et les
            professionnels. Dirigée par {company.manager}.
          </p>
        </div>
        <nav aria-label="Pages du site" className="lg:col-span-3 lg:col-start-6">
          <p className="label text-mute">Navigation</p>
          <ul className="mt-5 grid gap-2.5 text-sm">
            {pages.map((p) => (
              <li key={p.to}>
                <Link to={p.to} className="text-paper/75 transition-colors hover:text-cyan">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lg:col-span-4">
          <p className="label text-mute">Contact</p>
          <ul className="mt-5 grid gap-2.5 text-sm">
            <li>
              <a href={company.phoneHref} className="font-mono text-paper/85 hover:text-cyan">
                {company.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${company.email}`} className="text-paper/85 hover:text-cyan">
                {company.email}
              </a>
            </li>
            <li className="text-paper/60">Perpignan · Pyrénées-Orientales (66)</li>
            <li className="text-paper/60">Lun.–ven. 7 h–20 h · Sam. 7 h–18 h · Dim. urgences</li>
          </ul>
          {company.socials.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {company.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-paper/75 hover:text-cyan">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="container-x mt-14 flex flex-col gap-4 border-t border-line pt-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {company.name}
        </p>
        <ul className="flex gap-6">
          <li>
            <Link to="/mentions-legales" className="hover:text-paper">
              Mentions légales
            </Link>
          </li>
          <li>
            <Link to="/confidentialite" className="hover:text-paper">
              Politique de confidentialité
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
