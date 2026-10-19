import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { company } from '../content/site'
import { Button, PhoneIcon } from './Button'

// Envoi configuré via .env (voir .env.example et README).
const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || ''
const ALLOW_FILES = ENDPOINT !== '' && import.meta.env.VITE_FORM_ALLOW_FILES === 'true'
const MAX_FILES = 5
const MAX_TOTAL_MB = 10

const projectTypes = ['Électricité', 'Climatisation', 'Autre demande (électricité ou climatisation)']
const buildings = ['Maison', 'Appartement', 'Commerce', 'Bureaux']

type Values = {
  name: string
  phone: string
  email: string
  projectType: string
  building: string
  city: string
  message: string
  consent: boolean
}
type Errors = Partial<Record<keyof Values | 'files', string>>
type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error'

function validate(v: Values, files: File[]): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Indiquez votre nom et prénom.'
  if (!/^(?:\+33\s?|0)[1-9](?:[\s.-]?\d{2}){4}$/.test(v.phone.trim())) e.phone = 'Indiquez un numéro de téléphone valide (ex. 06 12 34 56 78).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Indiquez une adresse e-mail valide.'
  if (!v.projectType) e.projectType = 'Choisissez le type de projet.'
  if (!v.building) e.building = 'Choisissez le type de bâtiment.'
  if (v.city.trim().length < 2) e.city = 'Indiquez la commune du chantier.'
  if (v.message.trim().length < 15) e.message = 'Décrivez votre besoin en quelques mots (15 caractères minimum).'
  if (!v.consent) e.consent = 'Votre accord est nécessaire pour traiter votre demande.'
  if (files.length > MAX_FILES) e.files = `${MAX_FILES} fichiers maximum.`
  else if (files.reduce((s, f) => s + f.size, 0) > MAX_TOTAL_MB * 1024 * 1024) e.files = `${MAX_TOTAL_MB} Mo maximum au total.`
  return e
}

function buildMailto(v: Values) {
  const body = [
    `Nom : ${v.name}`,
    `Téléphone : ${v.phone}`,
    `E-mail : ${v.email}`,
    `Type de projet : ${v.projectType}`,
    `Type de bâtiment : ${v.building}`,
    `Commune du chantier : ${v.city}`,
    '',
    v.message,
  ].join('\n')
  const subject = `Demande de devis – ${v.projectType} – ${v.city}`
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function QuoteForm() {
  const [params] = useSearchParams()
  const preset = params.get('type')
  const [values, setValues] = useState<Values>({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    building: '',
    city: '',
    message: '',
    consent: false,
  })
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  // Pré-sélection depuis ?type=… (après hydratation, la page étant pré-rendue sans paramètre).
  useEffect(() => {
    const t = preset === 'climatisation' ? projectTypes[1] : preset === 'electricite' ? projectTypes[0] : ''
    if (t) setValues((v) => (v.projectType ? v : { ...v, projectType: t }))
  }, [preset])
  const statusRef = useRef<HTMLDivElement>(null)

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    const next = { ...values, [k]: val }
    setValues(next)
    if (touched[k] || errors[k]) setErrors((prev) => ({ ...prev, [k]: validate(next, files)[k] }))
  }
  const blur = (k: keyof Values) => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors((prev) => ({ ...prev, [k]: validate(values, files)[k] }))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate(values, files)
    setErrors(errs)
    const firstInvalid = Object.keys(errs).find((k) => errs[k as keyof Errors])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    if (!ENDPOINT) {
      // Aucun service d'envoi configuré : on ouvre la messagerie du visiteur avec la demande pré-remplie.
      window.location.href = buildMailto(values)
      setStatus('mailto')
      requestAnimationFrame(() => statusRef.current?.focus())
      return
    }

    setStatus('sending')
    try {
      const data = new FormData(e.currentTarget)
      data.set('consent', 'oui')
      data.set('_subject', `Demande de devis – ${values.projectType} – ${values.city}`)
      data.set('_replyto', values.email)
      if (!ALLOW_FILES) data.delete('files')
      const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  if (status === 'sent') {
    return (
      <Confirmation ref={statusRef} title="Demande envoyée.">
        Merci {values.name.split(' ')[0]}, votre demande a bien été transmise à YLEC. Nous reviendrons vers vous par téléphone ou
        par e-mail.
      </Confirmation>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-6 gap-y-7 sm:grid-cols-2" aria-describedby="form-note">
      {/* Champ piège anti-spam, invisible pour les visiteurs */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field label="Nom et prénom" error={errors.name}>
        {(p) => (
          <input {...p} name="name" autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} onBlur={() => blur('name')} />
        )}
      </Field>
      <Field label="Téléphone" error={errors.phone}>
        {(p) => (
          <input
            {...p}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            onBlur={() => blur('phone')}
          />
        )}
      </Field>
      <Field label="Adresse e-mail" error={errors.email}>
        {(p) => (
          <input
            {...p}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            onBlur={() => blur('email')}
          />
        )}
      </Field>
      <Field label="Commune du chantier" error={errors.city}>
        {(p) => (
          <input
            {...p}
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(e) => set('city', e.target.value)}
            onBlur={() => blur('city')}
          />
        )}
      </Field>

      <Choice
        name="projectType"
        legend="Type de projet"
        options={projectTypes}
        value={values.projectType}
        onChange={(v) => set('projectType', v)}
        error={errors.projectType}
      />
      <Choice
        name="building"
        legend="Type de bâtiment"
        options={buildings}
        value={values.building}
        onChange={(v) => set('building', v)}
        error={errors.building}
      />

      <Field label="Description du besoin" error={errors.message} full>
        {(p) => (
          <textarea
            {...p}
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            onBlur={() => blur('message')}
            placeholder="Ex. : rénovation du tableau électrique d’une maison, installation d’une climatisation dans deux chambres…"
          />
        )}
      </Field>

      {ALLOW_FILES && (
        <div className="sm:col-span-2">
          <FileInput files={files} onChange={setFiles} error={errors.files} />
        </div>
      )}

      <div className="sm:col-span-2">
        <label className="group flex cursor-pointer items-start gap-4">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'err-consent' : undefined}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan ${
              values.consent ? 'border-volt bg-volt' : errors.consent ? 'border-red-400' : 'border-paper/30 group-hover:border-paper/60'
            }`}
          >
            {values.consent && (
              <svg viewBox="0 0 12 12" className="h-3 w-3">
                <path d="M2 6.5 5 9l5-6" fill="none" stroke="white" strokeWidth="1.8" />
              </svg>
            )}
          </span>
          <span className="text-sm leading-relaxed text-paper/70">
            J’accepte que mes données soient utilisées pour traiter ma demande, conformément à la{' '}
            <Link to="/confidentialite" className="text-paper underline decoration-volt underline-offset-4 hover:text-cyan">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
        <ErrorText id="err-consent" msg={errors.consent} />
      </div>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="max-w-md text-xs leading-relaxed text-paper/45">
          {ENDPOINT
            ? 'Tous les champs sont obligatoires. Votre demande est transmise directement à YLEC.'
            : `Tous les champs sont obligatoires. L’envoi ouvre votre messagerie avec la demande pré-remplie à destination de ${company.email}.`}
        </p>
        <Button type="submit" disabled={status === 'sending'} className="sm:shrink-0">
          {status === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
        </Button>
      </div>

      <div ref={statusRef} tabIndex={-1} className="outline-none sm:col-span-2" aria-live="polite">
        <AnimatePresence>
          {status === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
              className="rounded-2xl border border-red-400/40 bg-red-500/10 p-5 text-sm leading-relaxed"
            >
              <p className="font-semibold text-red-200">L’envoi n’a pas abouti.</p>
              <p className="mt-1 text-paper/75">
                Votre demande n’a pas été transmise. Réessayez dans un instant, ou contactez directement YLEC au{' '}
                <a href={company.phoneHref} className="underline">
                  {company.phone}
                </a>{' '}
                ou à{' '}
                <a href={buildMailto(values)} className="underline">
                  {company.email}
                </a>
                .
              </p>
            </motion.div>
          )}
          {status === 'mailto' && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-volt/40 bg-volt/10 p-5 text-sm leading-relaxed"
            >
              <p className="font-semibold">Votre messagerie s’est ouverte avec votre demande pré-remplie.</p>
              <p className="mt-1 text-paper/75">
                Pensez à cliquer sur « Envoyer » dans votre messagerie pour la transmettre. Si rien ne s’est ouvert,{' '}
                <a href={buildMailto(values)} className="underline">
                  cliquez ici
                </a>{' '}
                ou appelez le{' '}
                <a href={company.phoneHref} className="underline">
                  {company.phone}
                </a>
                .
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

type FieldProps = {
  id: string
  className: string
  'aria-invalid': boolean
  'aria-describedby'?: string
  required: true
}

const inputCls =
  'w-full border-0 border-b bg-transparent px-0 pt-2 pb-3 text-lg text-paper placeholder:text-paper/30 transition-colors focus:outline-none focus-visible:outline-none focus:ring-0'

function Field({ label, error, full, children }: { label: string; error?: string; full?: boolean; children: (p: FieldProps) => ReactNode }) {
  const id = useId()
  return (
    <div className={`group relative ${full ? 'sm:col-span-2' : ''}`}>
      <label htmlFor={id} className="label block text-paper/55 transition-colors group-focus-within:text-cyan">
        {label}
      </label>
      <div className="relative">
      {children({
        id,
        required: true,
        'aria-invalid': !!error,
        'aria-describedby': error ? `${id}-err` : undefined,
        className: `${inputCls} ${error ? 'border-red-400/70' : 'border-paper/20'} block resize-none`,
      })}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-volt to-cyan transition-transform duration-500 group-focus-within:scale-x-100"
      />
      </div>
      <ErrorText id={`${id}-err`} msg={error} />
    </div>
  )
}

function Choice({
  name,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  name: string
  legend: string
  options: string[]
  value: string
  onChange: (v: string) => void
  error?: string
}) {
  const id = useId()
  return (
    <fieldset className="sm:col-span-2" aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="label mb-3 text-paper/55">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o}
              checked={value === o}
              onChange={() => onChange(o)}
              className="peer sr-only"
              aria-invalid={!!error}
            />
            <span
              className={`block rounded-full border px-5 py-3 text-sm transition-all peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cyan ${
                value === o
                  ? 'border-volt bg-volt text-white shadow-[0_6px_24px_-8px_rgba(57,123,255,0.9)]'
                  : error
                    ? 'border-red-400/50 text-paper/75 hover:border-paper/40'
                    : 'border-paper/20 text-paper/75 hover:border-paper/40 hover:text-paper'
              }`}
            >
              {o}
            </span>
          </label>
        ))}
      </div>
      <ErrorText id={`${id}-err`} msg={error} />
    </fieldset>
  )
}

function FileInput({ files, onChange, error }: { files: File[]; onChange: (f: File[]) => void; error?: string }) {
  const id = useId()
  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-paper/20 px-6 py-8 text-center transition-colors hover:border-cyan focus-within:border-cyan"
      >
        <span className="label text-cyan">Photos ou documents</span>
        <span className="text-sm text-paper/60">
          Facultatif · images ou PDF · {MAX_FILES} fichiers, {MAX_TOTAL_MB} Mo maximum
        </span>
        <input
          id={id}
          name="files"
          type="file"
          multiple
          accept="image/*,.pdf"
          className="sr-only"
          onChange={(e) => onChange(Array.from(e.target.files ?? []))}
          aria-describedby={error ? `${id}-err` : undefined}
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-3 grid gap-1 text-sm text-paper/70">
          {files.map((f) => (
            <li key={f.name + f.size} className="font-mono text-xs">
              {f.name} · {(f.size / 1024 / 1024).toFixed(1)} Mo
            </li>
          ))}
        </ul>
      )}
      <ErrorText id={`${id}-err`} msg={error} />
    </div>
  )
}

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 text-sm text-red-300"
        >
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

function Confirmation({ ref, title, children }: { ref: React.Ref<HTMLDivElement>; title: string; children: ReactNode }) {
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      role="status"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-volt/40 bg-volt/10 p-8 outline-none lg:p-12"
    >
      <motion.svg viewBox="0 0 48 48" className="h-12 w-12 text-cyan" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeOpacity=".3" strokeWidth="2" />
        <motion.path
          d="M14 25l7 7 13-15"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
      </motion.svg>
      <p className="text-display mt-6 text-3xl">{title}</p>
      <p className="mt-4 max-w-lg leading-relaxed text-paper/75">{children}</p>
      <a href={company.phoneHref} className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-cyan">
        <PhoneIcon className="h-3.5 w-3.5" /> {company.phone}
      </a>
    </motion.div>
  )
}
