import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'line'

type Common = { children: ReactNode; variant?: Variant; className?: string; icon?: ReactNode }
type AsLink = Common & { to: string; href?: never; external?: never; type?: never; disabled?: never }
type AsAnchor = Common & { href: string; external?: boolean; to?: never; type?: never; disabled?: never }
type AsButton = Common & { type: 'submit' | 'button'; disabled?: boolean; onClick?: () => void; to?: never; href?: never }

const base =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-6 py-3.5 text-[0.78rem] font-semibold tracking-[0.14em] uppercase transition-[transform,background-color,color,box-shadow] duration-300 ease-out active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<Variant, string> = {
  primary:
    'bg-volt text-white shadow-[0_0_0_0_rgba(57,123,255,0)] hover:shadow-[0_10px_40px_-8px_rgba(57,123,255,0.75)] hover:bg-[#4a88ff]',
  ghost: 'border border-paper/25 text-paper hover:border-cyan hover:text-white backdrop-blur-sm',
  line: 'px-0 py-1 rounded-none text-paper hover:text-cyan',
}

function Inner({ children, icon, variant }: Common) {
  return (
    <>
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover:animate-[sweep_0.9s_ease-out]"
        />
      )}
      <span className="relative">{children}</span>
      <span className="relative inline-flex transition-transform duration-300 group-hover:translate-x-1">
        {icon ?? <Arrow />}
      </span>
      {variant === 'line' && (
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-30 bg-cyan transition-transform duration-500 group-hover:scale-x-100"
        />
      )}
    </>
  )
}

export function Button(props: AsLink | AsAnchor | AsButton) {
  const { variant = 'primary', className = '' } = props
  const cls = `${base} ${variants[variant]} ${className}`
  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        <Inner {...props} variant={variant} />
      </Link>
    )
  }
  if ('href' in props && props.href) {
    return (
      <a
        href={props.href}
        className={cls}
        {...(props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <Inner {...props} variant={variant} />
        {props.external && <span className="sr-only"> (nouvel onglet)</span>}
      </a>
    )
  }
  const b = props as AsButton
  return (
    <button type={b.type} disabled={b.disabled} onClick={b.onClick} className={cls}>
      <Inner {...props} variant={variant} />
    </button>
  )
}

export function Arrow({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M2 8h11M9 4l4 4-4 4" strokeLinecap="square" />
    </svg>
  )
}

export function PhoneIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path
        d="M5 3h3.5l1.8 4.6-2.3 1.5a11 11 0 0 0 6.9 6.9l1.5-2.3L21 15.5V19a2 2 0 0 1-2.1 2A17 17 0 0 1 3 5.1 2 2 0 0 1 5 3Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MailIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </svg>
  )
}
