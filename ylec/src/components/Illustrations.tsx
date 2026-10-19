// Visuels graphiques générés (et non des photos de chantier) : ils servent
// d'illustration tant que les photographies réelles ne sont pas fournies.

export function PanelIllustration({ className = '' }: { className?: string }) {
  const rows = [0, 1, 2]
  return (
    <svg viewBox="0 0 400 320" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="pnl-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#232937" />
          <stop offset="1" stopColor="#161a23" />
        </linearGradient>
        <linearGradient id="pnl-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#397BFF" stopOpacity="0" />
          <stop offset=".5" stopColor="#65E6FF" />
          <stop offset="1" stopColor="#397BFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Câbles entrants */}
      {[120, 160, 200, 240, 280].map((x, i) => (
        <path
          key={x}
          d={`M${x} 0 V30 l${(i - 2) * 6} 12`}
          stroke="#397BFF"
          strokeOpacity=".5"
          strokeWidth="2"
          className="[stroke-dasharray:6_10] group-hover:animate-[dash-flow_3s_linear_infinite]"
        />
      ))}
      <rect x="70" y="40" width="260" height="250" rx="14" fill="url(#pnl-g)" stroke="#F4F5F7" strokeOpacity=".14" />
      <rect x="86" y="56" width="228" height="10" rx="3" fill="#F4F5F7" fillOpacity=".06" />
      {rows.map((r) => (
        <g key={r} transform={`translate(0 ${84 + r * 66})`}>
          <rect x="86" y="0" width="228" height="50" rx="6" fill="#0d1017" stroke="#F4F5F7" strokeOpacity=".08" />
          <rect x="86" y="21" width="228" height="8" fill="#F4F5F7" fillOpacity=".05" />
          {Array.from({ length: 9 }).map((_, i) => {
            const lit = (r * 9 + i) % 4 !== 3
            return (
              <g key={i} transform={`translate(${96 + i * 24} 6)`}>
                <rect width="18" height="38" rx="3" fill="#E7E9EE" fillOpacity={i === 0 ? '.92' : '.82'} />
                <rect x="5" y={lit ? 8 : 20} width="8" height="10" rx="1.5" fill={lit ? '#397BFF' : '#5b6372'} />
                <rect x="4" y="31" width="10" height="3" rx="1" fill="#090B10" fillOpacity=".25" />
              </g>
            )
          })}
        </g>
      ))}
      {/* Témoin et balayage lumineux au survol */}
      <circle cx="304" cy="61" r="3.5" fill="#65E6FF" className="animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
      <rect
        x="70"
        y="40"
        width="80"
        height="250"
        fill="url(#pnl-glow)"
        opacity=".14"
        className="-translate-x-40 transition-transform duration-[1.4s] ease-out group-hover:translate-x-[330px]"
      />
    </svg>
  )
}

export function ClimIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 320" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="ac-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F8FA" />
          <stop offset="1" stopColor="#D9DDE4" />
        </linearGradient>
        <linearGradient id="ac-air" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#65E6FF" stopOpacity=".9" />
          <stop offset="1" stopColor="#397BFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Mur et ligne d'architecture */}
      <path d="M20 40 H380" stroke="#F4F5F7" strokeOpacity=".08" />
      <path d="M20 300 H380" stroke="#F4F5F7" strokeOpacity=".08" />
      {/* Unité murale */}
      <g className="transition-transform duration-700 ease-out group-hover:-translate-y-1">
        <rect x="70" y="70" width="260" height="74" rx="20" fill="url(#ac-body)" />
        <rect x="70" y="124" width="260" height="20" rx="10" fill="#C7CCD5" />
        <rect x="92" y="130" width="216" height="5" rx="2.5" fill="#9aa2b1" fillOpacity=".7" />
        <circle cx="306" cy="92" r="3" fill="#397BFF" className="animate-[pulse-dot_2.4s_ease-in-out_infinite]" />
        <text x="96" y="100" fill="#171B24" fillOpacity=".55" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2">
          22°
        </text>
      </g>
      {/* Flux d'air */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${110 + i * 45} 156 C ${100 + i * 45} 200, ${140 + i * 45} 230, ${118 + i * 45} 290`}
          stroke="url(#ac-air)"
          strokeWidth="2"
          strokeLinecap="round"
          className="[stroke-dasharray:14_16] animate-[dash-flow_4s_linear_infinite] group-hover:[animation-duration:1.6s]"
          style={{ animationDelay: `${i * -0.6}s` }}
        />
      ))}
    </svg>
  )
}

/** Unité extérieure stylisée, pour la section partenaire. */
export function OutdoorUnitIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true" fill="none">
      <rect x="60" y="60" width="280" height="190" rx="10" fill="#E9ECF1" />
      <rect x="60" y="232" width="280" height="18" rx="4" fill="#C9CED7" />
      <circle cx="160" cy="146" r="68" fill="#d5dae2" />
      {Array.from({ length: 8 }).map((_, i) => (
        <circle key={i} cx="160" cy="146" r={10 + i * 8} stroke="#9aa2b1" strokeOpacity=".55" strokeWidth="1.5" />
      ))}
      <g style={{ transformOrigin: '160px 146px' }} className="animate-[spin_6s_linear_infinite]">
        {[0, 120, 240].map((a) => (
          <path key={a} d="M160 146 q 20 -38 0 -58 q -12 30 0 58" fill="#7b8494" transform={`rotate(${a} 160 146)`} />
        ))}
      </g>
      <circle cx="160" cy="146" r="7" fill="#397BFF" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x="252" y={82 + i * 12} width="66" height="4" rx="2" fill="#b8bec9" />
      ))}
      <rect x="90" y="250" width="16" height="22" fill="#9aa2b1" />
      <rect x="294" y="250" width="16" height="22" fill="#9aa2b1" />
    </svg>
  )
}
