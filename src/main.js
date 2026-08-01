import './style.css'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Carousel } from './carousel.js'
import {
  GALERIE_IMAGES,
  AVIS_MAS_BLEU,
  AVIS_CABANE_DU_PRODUCTEUR,
  AVIS_MAISON_COLONIALE,
  MAISON_COLONIALE_CHAMBRES,
  MAISON_COLONIALE_SERVICES,
} from './data.js'
import { serviceIconSvg } from './icons.js'

gsap.registerPlugin(ScrollTrigger)

const isTouch = window.matchMedia('(hover: none)').matches
const TOPBAR_OFFSET = 112

/* ---------- Lightbox (partagée par toutes les galeries) ---------- */
const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightbox-image')
let activeLightboxSet = []
let lightboxIndex = 0

function updateLightboxImage() {
  const item = activeLightboxSet[lightboxIndex]
  if (!item) return
  lightboxImage.src = item.src
  lightboxImage.alt = item.alt
}

function openLightbox(images, index) {
  activeLightboxSet = images
  lightboxIndex = index
  updateLightboxImage()
  lightbox.classList.add('is-open')
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.classList.remove('is-open')
  document.body.style.overflow = ''
}

function showLightbox(delta) {
  lightboxIndex = (lightboxIndex + delta + activeLightboxSet.length) % activeLightboxSet.length
  updateLightboxImage()
}

if (lightbox) {
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox)
  document.getElementById('lightbox-prev').addEventListener('click', () => showLightbox(-1))
  document.getElementById('lightbox-next').addEventListener('click', () => showLightbox(1))

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox()
  })

  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') showLightbox(-1)
    if (e.key === 'ArrowRight') showLightbox(1)
  })
}

/* ---------- Galerie générale (page d'accueil) ---------- */
const galerieGrid = document.getElementById('galerie-grid')
if (galerieGrid) {
  galerieGrid.innerHTML = GALERIE_IMAGES.map(
    (item, i) => `
    <figure class="galerie__item" data-index="${i}">
      <img src="${item.src}" alt="${item.alt}" loading="lazy" />
    </figure>
  `
  ).join('')

  new Carousel({
    track: galerieGrid,
    prevBtn: document.getElementById('galerie-prev'),
    nextBtn: document.getElementById('galerie-next'),
    dotsEl: document.getElementById('galerie-dots'),
    autoplay: true,
    autoplaySpeed: 0.3,
    onItemClick: (i) => openLightbox(GALERIE_IMAGES, i),
  })
}

/* ---------- Avis clients (carrousel) ---------- */
/* Chaque page déclare data-avis="mas-bleu|cabane-du-producteur|maison-coloniale"
   sur #avis-track pour afficher les avis qui la concernent. */
const AVIS_MAP = {
  'mas-bleu': AVIS_MAS_BLEU,
  'cabane-du-producteur': AVIS_CABANE_DU_PRODUCTEUR,
  'maison-coloniale': AVIS_MAISON_COLONIALE,
}

const avisTrack = document.getElementById('avis-track')
if (avisTrack) {
  const avisItems = AVIS_MAP[avisTrack.dataset.avis] || []
  avisTrack.innerHTML = avisItems.map((item) => {
    const stars = Array.from({ length: 5 }, (_, i) =>
      `<svg viewBox="0 0 24 24" class="${i < item.rating ? '' : 'star--half'}"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7-5.4-4.7 7.1-.6z"/></svg>`
    ).join('')
    return `
      <blockquote class="avis__card glass" data-reveal>
        <span class="avis__quote" aria-hidden="true">&ldquo;</span>
        <div class="avis__card-stars">${stars}</div>
        <p>${item.text}</p>
        <footer class="avis__meta">${item.author} — <span>${item.source}</span></footer>
      </blockquote>
    `
  }).join('')

  new Carousel({
    track: avisTrack,
    prevBtn: document.getElementById('avis-prev'),
    nextBtn: document.getElementById('avis-next'),
    dotsEl: document.getElementById('avis-dots'),
    autoplay: true,
    autoplaySpeed: 0.25,
  })
}

/* ---------- Chambres de la Maison Coloniale (galerie unique) ---------- */
const chambresGrid = document.getElementById('chambres-grid')
if (chambresGrid) {
  chambresGrid.innerHTML = MAISON_COLONIALE_CHAMBRES.map(
    (item, i) => `
    <figure class="galerie__item" data-index="${i}">
      <img src="${item.src}" alt="${item.alt}" loading="lazy" />
    </figure>
  `
  ).join('')

  new Carousel({
    track: chambresGrid,
    prevBtn: document.getElementById('chambres-prev'),
    nextBtn: document.getElementById('chambres-next'),
    dotsEl: document.getElementById('chambres-dots'),
    autoplay: true,
    autoplaySpeed: 0.3,
    onItemClick: (i) => openLightbox(MAISON_COLONIALE_CHAMBRES, i),
  })
}

/* ---------- Services de la Maison Coloniale ---------- */
const servicesGrid = document.getElementById('services-grid')
if (servicesGrid) {
  servicesGrid.innerHTML = MAISON_COLONIALE_SERVICES.map(
    (service) => `
    <div class="service" data-reveal>
      <span class="service__icon">${serviceIconSvg(service.icon)}</span>
      <span class="service__label">${service.label}</span>
    </div>
  `
  ).join('')
}

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

/* ---------- Menu panel (hamburger) ---------- */
const menuTrigger = document.getElementById('menu-trigger')
const menuPanel = document.getElementById('menu-panel')
const menuOverlay = document.getElementById('menu-overlay')

if (menuTrigger && menuPanel && menuOverlay) {
  const closeMenu = () => {
    menuTrigger.classList.remove('is-open')
    menuPanel.classList.remove('is-open')
    menuOverlay.classList.remove('is-open')
    menuTrigger.setAttribute('aria-expanded', 'false')
    document.body.style.overflow = ''
  }

  const openMenu = () => {
    menuTrigger.classList.add('is-open')
    menuPanel.classList.add('is-open')
    menuOverlay.classList.add('is-open')
    menuTrigger.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
  }

  menuTrigger.addEventListener('click', () => {
    menuTrigger.classList.contains('is-open') ? closeMenu() : openMenu()
  })

  menuOverlay.addEventListener('click', closeMenu)

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu()
  })

  menuPanel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu)
  })

  const heroMenuCta = document.getElementById('hero-menu-cta')
  if (heroMenuCta) {
    heroMenuCta.addEventListener('click', (e) => {
      e.preventDefault()
      openMenu()
    })
  }
}

/* ---------- Anchor links (offset for fixed topbar) ---------- */
/* Supports "#id" (same page) and "/#id" (links back to the homepage from a subpage) */
const onHomepage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html')

document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((link) => {
  const href = link.getAttribute('href')
  if (href === '#') return // not a real anchor (e.g. JS-only trigger)
  if (href.startsWith('/#') && !onHomepage) return // let the browser navigate to the homepage normally

  link.addEventListener('click', (e) => {
    const hash = href.startsWith('/#') ? href.slice(1) : href
    const target = document.querySelector(hash)
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

/* ---------- Galerie reveal (page d'accueil + chambres Maison Coloniale) ---------- */
document.querySelectorAll('.galerie__grid').forEach((grid) => {
  gsap.to(grid.querySelectorAll('.galerie__item'), {
    opacity: 1,
    x: 0,
    scale: 1,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: grid.closest('.section'),
      start: 'top 75%',
      once: true,
    },
  })
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

  document.querySelectorAll('a, button, .card, .galerie__item, .service').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'))
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'))
  })
}
