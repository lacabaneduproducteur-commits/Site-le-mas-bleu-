/* ============================================================
   Carrousel réutilisable : glissement souris/tactile, flèches,
   points de position, défilement automatique lent en pause au survol.
   ============================================================ */
export class Carousel {
  constructor({ track, prevBtn, nextBtn, dotsEl, autoplay = false, autoplaySpeed = 0.35, onItemClick }) {
    this.track = track
    this.prevBtn = prevBtn
    this.nextBtn = nextBtn
    this.dotsEl = dotsEl
    this.autoplay = autoplay
    this.autoplaySpeed = autoplaySpeed
    this.paused = false
    this.dragged = false
    this.items = Array.from(track.children)

    if (!this.items.length) return

    this.setupDots()
    this.setupNav()
    this.setupDrag()
    this.setupObserver()
    if (this.autoplay) this.startAutoplay()

    if (onItemClick) {
      this.items.forEach((item, i) => {
        item.addEventListener('click', () => {
          if (this.dragged) return
          onItemClick(i)
        })
      })
    }
  }

  setupDots() {
    if (!this.dotsEl || this.items.length < 2) return
    this.dotsEl.innerHTML = this.items
      .map((_, i) => `<button class="carousel__dot" data-i="${i}" aria-label="Aller à l'image ${i + 1}"></button>`)
      .join('')
    this.dots = Array.from(this.dotsEl.children)
    this.dots.forEach((dot) => {
      dot.addEventListener('click', () => this.scrollToIndex(parseInt(dot.dataset.i, 10)))
    })
    this.updateDots(0)
  }

  updateDots(index) {
    this.dots?.forEach((d, i) => d.classList.toggle('is-active', i === index))
  }

  scrollToIndex(i) {
    const item = this.items[i]
    if (!item) return
    this.track.scrollTo({ left: item.offsetLeft - this.track.offsetLeft, behavior: 'smooth' })
  }

  setupNav() {
    const amount = () => Math.min(this.track.clientWidth * 0.9, 440)
    this.prevBtn?.addEventListener('click', () => {
      this.pauseAutoplay()
      this.track.scrollBy({ left: -amount(), behavior: 'smooth' })
    })
    this.nextBtn?.addEventListener('click', () => {
      this.pauseAutoplay()
      this.track.scrollBy({ left: amount(), behavior: 'smooth' })
    })
  }

  setupDrag() {
    let isDown = false
    let startX = 0
    let scrollStart = 0

    const down = (x) => {
      isDown = true
      this.dragged = false
      startX = x
      scrollStart = this.track.scrollLeft
      this.pauseAutoplay()
      this.track.style.cursor = 'grabbing'
    }
    const move = (x) => {
      if (!isDown) return
      const dx = x - startX
      if (Math.abs(dx) > 5) this.dragged = true
      this.track.scrollLeft = scrollStart - dx
    }
    const up = () => {
      isDown = false
      this.track.style.cursor = 'grab'
    }

    this.track.style.cursor = 'grab'
    this.track.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') down(e.clientX)
    })
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse') move(e.clientX)
    })
    window.addEventListener('pointerup', up)

    this.track.addEventListener('touchstart', () => this.pauseAutoplay(), { passive: true })

    this.track.addEventListener(
      'wheel',
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault()
          this.track.scrollBy({ left: e.deltaY, behavior: 'auto' })
          this.pauseAutoplay()
        }
      },
      { passive: false }
    )
  }

  setupObserver() {
    if (this.items.length < 2) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const i = this.items.indexOf(entry.target)
            if (i !== -1) this.updateDots(i)
          }
        })
      },
      { root: this.track, threshold: [0.6] }
    )
    this.items.forEach((item) => observer.observe(item))
  }

  pauseAutoplay() {
    if (!this.autoplay) return
    this.paused = true
    clearTimeout(this._resumeTimer)
    this._resumeTimer = setTimeout(() => {
      this.paused = false
    }, 2600)
  }

  startAutoplay() {
    const step = () => {
      if (!this.paused && !document.hidden) {
        if (this.track.scrollLeft + this.track.clientWidth >= this.track.scrollWidth - 2) {
          this.track.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          this.track.scrollLeft += this.autoplaySpeed
        }
      }
      this.rafId = requestAnimationFrame(step)
    }
    this.rafId = requestAnimationFrame(step)

    this.track.addEventListener('mouseenter', () => {
      this.paused = true
    })
    this.track.addEventListener('mouseleave', () => {
      this.paused = false
    })
  }
}
