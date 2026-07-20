import './style.css'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const isTouch = window.matchMedia('(hover: none)').matches

document.getElementById('year').textContent = new Date().getFullYear()

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

/* ---------- Anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'))
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
  })
})

/* ---------- Reveal animations ---------- */
document.querySelectorAll('.section, .hero').forEach((section) => {
  const items = section.querySelectorAll('[data-reveal]')
  if (!items.length) return

  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 1,
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
  duration: 1.2,
  ease: 'power3.out',
  stagger: 0.12,
  delay: 0.2,
})

/* ---------- Hero parallax ---------- */
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

/* ---------- Card hover lift ---------- */
document.querySelectorAll('.card, .avis__card').forEach((card) => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, { y: -6, duration: 0.4, ease: 'power2.out' })
  })
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' })
  })
})

/* ---------- Custom cursor ---------- */
if (!isTouch) {
  const cursor = document.getElementById('cursor')
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
  })

  document.querySelectorAll('a, button, .card').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'))
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'))
  })
}
