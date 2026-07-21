import './style.css'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const isTouch = window.matchMedia('(hover: none)').matches
const TOPBAR_OFFSET = 70

document.getElementById('year').textContent = new Date().getFullYear()

/* ---------- Page load fade-in ---------- */
requestAnimationFrame(() => {
  document.body.classList.add('is-loaded')
})

/* ---------- Smooth scroll (Lenis + GSAP ticker) ---------- */
if (!isTouch) {
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
}

/* ---------- Anchor links (offset for fixed topbar) ---------- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'))
    if (!target) return
    e.preventDefault()
    const top = target.getBoundingClientRect().top + window.scrollY - TOPBAR_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  })
})

/* ---------- Reveal animations ---------- */
document.querySelectorAll('.section, .hero').forEach((section) => {
  const items = section.querySelectorAll('[data-reveal]')
  if (!items.length) return

  gsap.to(items, {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    duration: 1.1,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
      once: true,
    },
  })
})

/* Hero content reveals immediately on load, not on scroll */
gsap.to('.hero [data-reveal]', {
  opacity: 1,
  y: 0,
  scale: 1,
  filter: 'blur(0px)',
  duration: 1.3,
  ease: 'power3.out',
  stagger: 0.12,
  delay: 0.2,
})

/* ---------- Footer reveal ---------- */
gsap.to('[data-reveal-footer]', {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: 'power3.out',
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.footer',
    start: 'top 85%',
    once: true,
  },
})

/* ---------- Hero parallax + vignette breathing ---------- */
if (!isTouch) {
  gsap.to('.hero__bg', {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/* ---------- Animated count-up numbers ---------- */
document.querySelectorAll('.chiffre__number').forEach((el) => {
  const target = parseFloat(el.dataset.target)
  const decimals = parseInt(el.dataset.decimals || '0', 10)
  const counter = { val: 0 }

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(counter, {
        val: target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = decimals
            ? counter.val.toFixed(decimals).replace('.', ',')
            : Math.round(counter.val)
        },
      })
    },
  })
})

/* ---------- Card hover lift + subtle 3D tilt ---------- */
document.querySelectorAll('.card, .avis__card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out' })
  })
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y: 0, rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
  })

  if (!isTouch) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      gsap.to(card, {
        rotateY: px * 6,
        rotateX: py * -6,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 800,
      })
    })
  }
})

/* ---------- Custom dual-speed cursor ---------- */
if (!isTouch) {
  const cursor = document.getElementById('cursor')
  const dot = document.getElementById('cursor-dot')
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  const mouse = { x: pos.x, y: pos.y }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  gsap.ticker.add(() => {
    pos.x += (mouse.x - pos.x) * 0.18
    pos.y += (mouse.y - pos.y) * 0.18
    cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
    dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`
  })

  document.querySelectorAll('a, button, .card').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'))
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'))
  })
}
