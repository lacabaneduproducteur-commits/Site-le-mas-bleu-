import { useEffect, useRef } from 'react'

type Point = { x: number; y: number }
type Trace = { pts: Point[]; lens: number[]; total: number; delay: number; pulse: number; speed: number }

type Props = {
  className?: string
  /** Point de convergence des lignes, en fraction de la largeur / hauteur. */
  target?: { x: number; y: number }
  /** Densité relative des tracés (1 = hero). */
  density?: number
  /** Durée de l'animation d'apparition, en secondes. */
  revealDuration?: number
}

const CELL = 28

function rand(seed: number) {
  // Générateur déterministe : le motif reste identique d'un rendu à l'autre.
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

function buildTraces(w: number, h: number, target: Point, density: number): Trace[] {
  const r = rand(66)
  const count = Math.round(Math.min(46, Math.max(14, (w * h) / 26000)) * density)
  const traces: Trace[] = []
  const snap = (v: number) => Math.round(v / CELL) * CELL

  for (let i = 0; i < count; i++) {
    // Départ sur un bord de l'écran
    const side = Math.floor(r() * 4)
    let x = side === 0 ? 0 : side === 1 ? w : snap(r() * w)
    let y = side === 2 ? 0 : side === 3 ? h : snap(r() * h)
    if (side < 2) y = snap(r() * h)
    const pts: Point[] = [{ x, y }]
    // Anneau d'arrivée autour du point cible
    const stopRadius = 90 + r() * 140
    let guard = 0
    while (guard++ < 40) {
      const dx = target.x - x
      const dy = target.y - y
      const dist = Math.hypot(dx, dy)
      if (dist < stopRadius) break
      const step = CELL * (2 + Math.floor(r() * 5))
      const roll = r()
      if (roll < 0.34 && Math.abs(dx) > CELL) {
        x += Math.sign(dx) * Math.min(step, Math.abs(dx))
      } else if (roll < 0.68 && Math.abs(dy) > CELL) {
        y += Math.sign(dy) * Math.min(step, Math.abs(dy))
      } else {
        // Diagonale à 45°, signature des pistes de circuit imprimé
        const d = Math.min(step, Math.abs(dx), Math.abs(dy))
        if (d < CELL) continue
        x += Math.sign(dx) * d
        y += Math.sign(dy) * d
      }
      pts.push({ x, y })
    }
    if (pts.length < 2) continue
    const lens: number[] = []
    let total = 0
    for (let j = 1; j < pts.length; j++) {
      const l = Math.hypot(pts[j].x - pts[j - 1].x, pts[j].y - pts[j - 1].y)
      lens.push(l)
      total += l
    }
    traces.push({ pts, lens, total, delay: r() * 0.55, pulse: r(), speed: 0.05 + r() * 0.08 })
  }
  return traces
}

function pointAt(t: Trace, dist: number): Point {
  let d = Math.max(0, Math.min(dist, t.total))
  for (let j = 0; j < t.lens.length; j++) {
    if (d <= t.lens[j]) {
      const k = t.lens[j] === 0 ? 0 : d / t.lens[j]
      const a = t.pts[j]
      const b = t.pts[j + 1]
      return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
    }
    d -= t.lens[j]
  }
  return t.pts[t.pts.length - 1]
}

function strokePartial(ctx: CanvasRenderingContext2D, t: Trace, from: number, to: number) {
  ctx.beginPath()
  let acc = 0
  let started = false
  for (let j = 0; j < t.lens.length; j++) {
    const a = t.pts[j]
    const b = t.pts[j + 1]
    const segStart = acc
    const segEnd = acc + t.lens[j]
    acc = segEnd
    if (segEnd < from) continue
    if (segStart > to) break
    const s = Math.max(0, (from - segStart) / t.lens[j])
    const e = Math.min(1, (to - segStart) / t.lens[j])
    const p1 = { x: a.x + (b.x - a.x) * s, y: a.y + (b.y - a.y) * s }
    const p2 = { x: a.x + (b.x - a.x) * e, y: a.y + (b.y - a.y) * e }
    if (!started) {
      ctx.moveTo(p1.x, p1.y)
      started = true
    }
    ctx.lineTo(p2.x, p2.y)
  }
  ctx.stroke()
}

/**
 * Lignes électriques lumineuses : des pistes de circuit convergent vers un
 * point (le logo), puis de fines impulsions de lumière les parcourent.
 * Respecte prefers-reduced-motion et se met en pause hors écran.
 */
export function CircuitCanvas({ className = '', target = { x: 0.5, y: 0.5 }, density = 1, revealDuration = 1.6 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let traces: Trace[] = []
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const start = performance.now()
    let last = start

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      traces = buildTraces(w, h, { x: w * target.x, y: h * target.y }, density)
    }

    const draw = (now: number) => {
      const elapsed = (now - start) / 1000
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      ctx.clearRect(0, 0, w, h)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      for (const t of traces) {
        const p = reduce ? 1 : Math.min(1, Math.max(0, (elapsed - t.delay) / revealDuration))
        const eased = 1 - Math.pow(1 - p, 3)
        const head = t.total * eased

        // Piste de base
        ctx.strokeStyle = 'rgba(244,245,247,0.075)'
        ctx.lineWidth = 1
        strokePartial(ctx, t, 0, head)

        // Front lumineux pendant la révélation
        if (p > 0 && p < 1) {
          ctx.strokeStyle = 'rgba(101,230,255,0.9)'
          ctx.lineWidth = 1.5
          strokePartial(ctx, t, Math.max(0, head - 70), head)
        }

        // Pastille de connexion en bout de piste
        if (p >= 1) {
          const end = t.pts[t.pts.length - 1]
          ctx.fillStyle = 'rgba(57,123,255,0.55)'
          ctx.beginPath()
          ctx.arc(end.x, end.y, 2.2, 0, Math.PI * 2)
          ctx.fill()
        }

        // Impulsions continues, discrètes
        if (!reduce && p >= 1) {
          t.pulse = (t.pulse + t.speed * dt * (600 / Math.max(300, t.total))) % 1.6
          if (t.pulse <= 1) {
            const pos = t.total * t.pulse
            ctx.strokeStyle = 'rgba(57,123,255,0.18)'
            ctx.lineWidth = 4
            strokePartial(ctx, t, pos - 60, pos)
            ctx.strokeStyle = 'rgba(101,230,255,0.75)'
            ctx.lineWidth = 1.2
            strokePartial(ctx, t, pos - 40, pos)
            const hp = pointAt(t, pos)
            ctx.fillStyle = 'rgba(214,248,255,0.95)'
            ctx.beginPath()
            ctx.arc(hp.x, hp.y, 1.6, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      if (!reduce && visible) raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)

    const ro = new ResizeObserver(() => {
      resize()
      if (reduce) draw(performance.now())
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting && !document.hidden
      if (visible && !was && !reduce) {
        last = performance.now()
        raf = requestAnimationFrame(draw)
      }
    })
    io.observe(canvas)

    const onVis = () => {
      if (document.hidden) {
        visible = false
        cancelAnimationFrame(raf)
      } else if (!reduce) {
        visible = true
        last = performance.now()
        raf = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [target.x, target.y, density, revealDuration])

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none h-full w-full ${className}`} />
}
