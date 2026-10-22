import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Github, Linkedin, Menu, Minus, X } from 'lucide-react'
import { capabilities, portfolio, projects, skills } from './data/portfolio'

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Services', 'service'],
  ['Project', 'project'],
  ['Lab', 'lab'],
  ['Contact', 'contact'],
] as const

const featuredProjects = projects.filter((project) => project.featured)
const labProjects = projects.filter((project) => !project.featured)

function sampleTextParticles(
  text: string,
  width: number,
  height: number,
  fontSize: number,
  step: number
): { x: number; y: number }[] {
  const offscreen = document.createElement('canvas')
  offscreen.width = Math.max(1, Math.floor(width))
  offscreen.height = Math.max(1, Math.floor(height))
  const ctx = offscreen.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []

  ctx.clearRect(0, 0, offscreen.width, offscreen.height)
  ctx.fillStyle = '#ffffff'
  ctx.font = `950 ${fontSize}px "Archivo Variable", "IBM Plex Sans", -apple-system, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, offscreen.width / 2, offscreen.height / 2)

  let imgData: ImageData
  try {
    imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height)
  } catch {
    return []
  }

  const data = imgData.data
  const points: { x: number; y: number }[] = []
  const w = offscreen.width
  const h = offscreen.height

  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const idx = (y * w + x) * 4
      if (data[idx + 3] > 128) {
        points.push({ x, y })
      }
    }
  }

  return points
}

function AksParticleLogo({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -1000, y: -1000 }
    let frame = 0
    let particles: {
      x: number
      y: number
      originX: number
      originY: number
      vx: number
      vy: number
      size: number
      alpha: number
    }[] = []

    const setup = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const width = rect.width || 76
      const height = rect.height || 36
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const fontSize = Math.round(height * 0.74)
      const points = sampleTextParticles('AKS', width, height, fontSize, 2)
      particles = points.map((pt) => ({
        x: pt.x,
        y: pt.y,
        originX: pt.x,
        originY: pt.y,
        vx: 0,
        vy: 0,
        size: Math.random() * 0.6 + 1.25,
        alpha: Math.random() * 0.35 + 0.65,
      }))
    }

    const draw = () => {
      const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2)
      const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2)
      context.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!reducedMotion) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < 26 && dist > 0) {
            const force = ((26 - dist) / 26) * 1.8
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }

          // Spring back to origin
          p.vx += (p.originX - p.x) * 0.16
          p.vy += (p.originY - p.y) * 0.16
          p.vx *= 0.74
          p.vy *= 0.74
          p.x += p.vx
          p.y += p.vy
        }

        context.fillStyle = `rgba(238, 241, 245, ${p.alpha})`
        context.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      }

      if (!reducedMotion) frame = window.requestAnimationFrame(draw)
    }

    setup()
    draw()

    if (document.fonts) {
      document.fonts.ready.then(() => {
        setup()
        draw()
      })
    }

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.x = -1000
      pointer.y = -1000
    }

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('resize', setup)

    return () => {
      window.cancelAnimationFrame(frame)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('resize', setup)
    }
  }, [])

  return (
    <span className={`aks-logo aks-logo--particle ${className}`.trim()}>
      <canvas ref={canvasRef} className="aks-logo__canvas" width={76} height={36} aria-hidden="true" />
      <span className="sr-only">AKS</span>
    </span>
  )
}

function AksParticleWord({ phase }: { phase: 'aks' | 'portfolio' | 'drop' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const reducedMotion = false
    let frame = 0
    let width = 0
    let height = 0
    let particles: {
      x: number
      y: number
      fromX: number
      fromY: number
      targetX: number
      targetY: number
      vx: number
      vy: number
      size: number
      alpha: number
      delay: number
    }[] = []

    const startedAt = performance.now()

    const setup = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.min(window.innerWidth * 0.9, 680)
      height = Math.min(window.innerHeight * 0.45, 260)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const fontSize = Math.round(Math.min(width * 0.34, height * 0.82))
      const step = width < 480 ? 4 : 5
      const points = sampleTextParticles('AKS', width, height, fontSize, step)
      const centerX = width / 2
      const centerY = height / 2

      particles = points.map((pt) => {
        const angle = Math.random() * Math.PI * 2
        const dist = Math.random() * 280 + 70
        return {
          x: pt.x,
          y: pt.y,
          fromX: centerX + Math.cos(angle) * dist,
          fromY: centerY + Math.sin(angle) * dist,
          targetX: pt.x,
          targetY: pt.y,
          vx: (pt.x - centerX) * 0.045 + (Math.random() - 0.5) * 4,
          vy: (pt.y - centerY) * 0.045 + (Math.random() - 0.5) * 4,
          size: Math.random() * 1.5 + 2.2,
          alpha: Math.random() * 0.35 + 0.65,
          delay: Math.random() * 200,
        }
      })
    }

    const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3)

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height)
      const elapsed = now - startedAt

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (phase !== 'aks') {
          // Disperse smoothly when transitioning to PORTFOLIO
          p.x += p.vx
          p.y += p.vy
          p.alpha = Math.max(0, p.alpha - 0.045)
        } else {
          // Assembling into the AKS letters
          const progress = Math.min(1, Math.max(0, (elapsed - p.delay) / 520))
          const eased = easeOutCubic(progress)
          p.x = p.fromX + (p.targetX - p.fromX) * eased
          p.y = p.fromY + (p.targetY - p.fromY) * eased

          if (progress >= 1) {
            // Subtle ambient shimmer breathing
            p.x += Math.sin(now * 0.003 + p.fromX) * 0.35
            p.y += Math.cos(now * 0.003 + p.fromY) * 0.35
          }
        }

        if (p.alpha > 0.01) {
          context.fillStyle = `rgba(242, 245, 248, ${p.alpha})`
          context.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
        }
      }

      frame = window.requestAnimationFrame(draw)
    }

    setup()
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setup()
      })
    }
    frame = window.requestAnimationFrame(draw)

    window.addEventListener('resize', setup)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', setup)
    }
  }, [phase])

  return (
    <div className={`portfolio-loader__word portfolio-loader__word--aks-particle ${phase === 'aks' ? 'is-active' : 'is-exit'}`}>
      <canvas ref={canvasRef} className="portfolio-loader__particle-canvas" aria-hidden="true" />
    </div>
  )
}

function PortfolioLoader({ onReveal, onComplete }: { onReveal: () => void; onComplete: () => void }) {
  const [phase, setPhase] = useState<'aks' | 'portfolio' | 'drop'>('aks')

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  useEffect(() => {
    // Phase 1: "AKS" particles assemble and shine (0 - 1300ms)
    const timer1 = window.setTimeout(() => {
      setPhase('portfolio')
    }, 1300)

    // Phase 2: "PORTFOLIO" word displays, then drops into hero (1300 - 2700ms)
    const timer2 = window.setTimeout(() => {
      setPhase('drop')
      onReveal()
    }, 2700)

    // Phase 3: loader finishes after drop
    const timer3 = window.setTimeout(onComplete, 3400)

    return () => {
      window.clearTimeout(timer1)
      window.clearTimeout(timer2)
      window.clearTimeout(timer3)
    }
  }, [onComplete, onReveal])

  return (
    <div className={`portfolio-loader portfolio-loader--${phase}`} role="status" aria-label="Loading portfolio">
      <div className="portfolio-loader__cluster" aria-hidden="true">
        {/* Step 1: AKS Word in Particles Format */}
        <AksParticleWord phase={phase} />

        {/* Step 2: PORTFOLIO Word */}
        <div className={`portfolio-loader__word portfolio-loader__word--portfolio ${phase === 'portfolio' || phase === 'drop' ? 'is-active' : ''}`}>
          {'PORTFOLIO'.split('').map((letter, index) => (
            <span
              className="portfolio-loader__letter"
              style={{ '--letter-index': index } as CSSProperties}
              key={index}
            >
              {letter}
            </span>
          ))}
        </div>
      </div>
      <span className="sr-only">{phase === 'drop' ? 'Portfolio ready' : 'Loading portfolio'}</span>
    </div>
  )
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -1000, y: -1000 }
    let frame = 0
    let width = 0
    let height = 0
    let particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = []

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const count = Math.min(520, Math.max(180, Math.round((width * height) / 2600)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        size: Math.random() * 1.2 + 0.35,
        alpha: Math.random() * 0.55 + 0.22,
      }))
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)
      for (const particle of particles) {
        if (!reducedMotion) {
          const dx = particle.x - pointer.x
          const dy = particle.y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < 110 && distance > 0) {
            particle.vx += (dx / distance) * 0.012
            particle.vy += (dy / distance) * 0.012
          }
          particle.vx *= 0.985
          particle.vy *= 0.985
          particle.x += particle.vx
          particle.y += particle.vy
          if (particle.x < -4) particle.x = width + 4
          if (particle.x > width + 4) particle.x = -4
          if (particle.y < -4) particle.y = height + 4
          if (particle.y > height + 4) particle.y = -4
        }
        context.beginPath()
        context.fillStyle = `rgba(238, 238, 238, ${particle.alpha})`
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        context.fill()
      }
      if (!reducedMotion) frame = window.requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.x = -1000
      pointer.y = -1000
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerleave', onPointerLeave)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />
}

function MosaicPortrait({ play }: { play: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!play) return
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    type Tile = {
      x: number
      y: number
      fromX: number
      fromY: number
      color: string
      alpha: number
      size: number
      delay: number
      phase: number
    }

    const image = new Image()
    image.src = '/aman-mosaic-portrait.png'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: -1000, y: -1000 }
    let width = 0
    let height = 0
    let tiles: Tile[] = []
    let frame = 0
    let startedAt = performance.now()

    const easeOut = (value: number) => 1 - Math.pow(1 - value, 3)

    const buildTiles = () => {
      if (!image.naturalWidth) return
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      const columns = Math.max(96, Math.min(220, Math.round(width / 6)))
      const sampleWidth = columns
      const sampleHeight = Math.max(36, Math.round(columns * (height / width)))
      const sample = document.createElement('canvas')
      sample.width = sampleWidth
      sample.height = sampleHeight
      const sampleContext = sample.getContext('2d', { willReadFrequently: true })
      if (!sampleContext) return

      const scale = Math.max(sampleWidth / image.naturalWidth, sampleHeight / image.naturalHeight)
      const drawWidth = image.naturalWidth * scale
      const drawHeight = image.naturalHeight * scale
      const mobileShift = width < 480 ? -sampleWidth * 0.08 : 0
      sampleContext.drawImage(image, (sampleWidth - drawWidth) / 2 + mobileShift, (sampleHeight - drawHeight) / 2, drawWidth, drawHeight)
      const pixels = sampleContext.getImageData(0, 0, sampleWidth, sampleHeight).data
      const cellWidth = width / sampleWidth
      const cellHeight = height / sampleHeight
      const cell = Math.min(cellWidth, cellHeight)

      tiles = []
      for (let row = 0; row < sampleHeight; row += 1) {
        for (let column = 0; column < sampleWidth; column += 1) {
          const offset = (row * sampleWidth + column) * 4
          const red = pixels[offset]
          const green = pixels[offset + 1]
          const blue = pixels[offset + 2]
          const brightness = (red + green + blue) / 3
          if (brightness < 16) continue
          const x = (column + 0.5) * cellWidth
          const y = (row + 0.5) * cellHeight
          const angle = Math.atan2(y - height / 2, x - width / 2)
          const scatter = 34 + Math.random() * 130
          tiles.push({
            x,
            y,
            fromX: x + Math.cos(angle) * scatter + (Math.random() - 0.5) * 80,
            fromY: y + Math.sin(angle) * scatter + (Math.random() - 0.5) * 80,
            color: `rgb(${Math.min(255, red * 1.35)} ${Math.min(255, green * 1.35)} ${Math.min(255, blue * 1.35)})`,
            alpha: Math.min(1, 0.22 + brightness / 150),
            size: Math.max(0.75, cell * (0.22 + (brightness / 255) * 0.22)),
            delay: (row / sampleHeight) * 420 + Math.random() * 380,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }
      startedAt = performance.now()
    }

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height)
      const elapsed = now - startedAt
      for (const tile of tiles) {
        const progress = reducedMotion ? 1 : Math.min(1, Math.max(0, (elapsed - tile.delay) / 1050))
        const eased = easeOut(progress)
        let x = tile.fromX + (tile.x - tile.fromX) * eased
        let y = tile.fromY + (tile.y - tile.fromY) * eased
        if (progress >= 1 && !reducedMotion) {
          x += Math.sin(now * 0.00055 + tile.phase) * 0.75
          y += Math.cos(now * 0.00045 + tile.phase) * 0.55
          const dx = x - pointer.x
          const dy = y - pointer.y
          const distance = Math.hypot(dx, dy)
          if (distance < 92 && distance > 0) {
            const push = (92 - distance) / 92
            x += (dx / distance) * push * 15
            y += (dy / distance) * push * 15
          }
        }
        context.globalAlpha = tile.alpha * eased
        context.fillStyle = tile.color
        context.fillRect(x - tile.size / 2, y - tile.size / 2, tile.size, tile.size)
      }
      context.globalAlpha = 1
      if (!reducedMotion) frame = window.requestAnimationFrame(draw)
    }

    const start = () => {
      buildTiles()
      if (reducedMotion) draw(performance.now())
      else frame = window.requestAnimationFrame(draw)
    }
    const onResize = () => buildTiles()
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
    }
    const onPointerLeave = () => {
      pointer.x = -1000
      pointer.y = -1000
    }

    image.addEventListener('load', start)
    if (image.complete) start()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('blur', onPointerLeave)
    return () => {
      window.cancelAnimationFrame(frame)
      image.removeEventListener('load', start)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', onPointerLeave)
    }
  }, [play])

  return <canvas ref={canvasRef} className="mosaic-portrait" aria-hidden="true" />
}

export default function PortfolioApp() {
  const [heroReady, setHeroReady] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openCapability, setOpenCapability] = useState<number | null>(null)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const revealHero = useCallback(() => setHeroReady(true), [])
  const finishLoading = useCallback(() => setLoaderVisible(false), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.dataset.menuOpen = menuOpen ? 'true' : 'false'
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      delete document.body.dataset.menuOpen
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const sections = navItems
      .map(([, id]) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = document.querySelectorAll<HTMLElement>('[data-animate]')
    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in-view')
        observer.unobserve(entry.target)
      }),
      { rootMargin: '0px 0px -12% 0px', threshold: 0.14 },
    )
    targets.forEach((target) => observer.observe(target))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {loaderVisible && <PortfolioLoader onReveal={revealHero} onComplete={finishLoading} />}
      <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
        <div className="site-header__inner">
          <a className="wordmark" href="#home" aria-label={`${portfolio.displayName}, home`} onClick={closeMenu}>
            <AksParticleLogo />
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'is-active' : undefined}>{label}</a>)}
          </nav>
          <button className="menu-trigger" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`} aria-hidden={!menuOpen}>
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} tabIndex={menuOpen ? 0 : -1} onClick={closeMenu}><span>{label}</span><ArrowDownRight aria-hidden="true" /></a>)}
      </nav>

      <main>
        <section id="home" className="hero" aria-labelledby="hero-title">
          <ParticleField />
          <img className="sr-only" src="/aman-mosaic-portrait.png" alt="A monochrome mosaic portrait of Aman Kumar Sharma wearing glasses and a suit." />
          <MosaicPortrait play={heroReady} />
          <div className="hero__shade" aria-hidden="true" />
          <div className={`hero__content ${heroReady ? 'hero__content--ready' : ''}`}>
            <h1 id="hero-title"><span>PORT</span><span>FOLIO</span></h1>
            <div className="hero__baseline">
              <p>{portfolio.role}</p>
              <div className="hero__actions">
                <a className="round-link" href="#about" aria-label="Scroll to about"><ArrowDown aria-hidden="true" /></a>
                {portfolio.email && <a className="pill-link" href={`mailto:${portfolio.email}`}>Contact</a>}
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about" aria-labelledby="about-title" data-animate="about">
          <div className="section-shell about__inner">
            <h2 id="about-title">About me</h2>
            <div className="about__copy">{portfolio.bio.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <div className="about__journey" data-animate="journey">
              <div className="about__journey-copy">
                <h3>Learning by building.</h3>
                {portfolio.journey.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <ol className="milestones" aria-label="Hackathon milestones">
                {portfolio.milestones.map((milestone) => <li key={milestone.year}><span>{milestone.year}</span><div><strong>{milestone.title}</strong><small>{milestone.detail}</small></div></li>)}
              </ol>
            </div>
          </div>
          <div className="stack-marquee" aria-label="Technical stack">
            {[0, 1, 2].map((row) => (
              <div className="marquee-row" key={row}>
                <div className="marquee-track" style={{ '--row': row } as CSSProperties}>
                  {[...skills, ...skills].map((skill, index) => <span key={`${row}-${index}`}>{skill}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="service" className="services" aria-labelledby="service-title">
          <div className="section-shell services__heading" data-animate="services-heading"><h2 id="service-title">Services</h2></div>
          <div className="service-list">
            {capabilities.map((capability, index) => {
              const open = openCapability === index
              return (
                <article key={capability.title} className={`service ${open ? 'service--open' : ''}`}>
                  <button className="service__trigger" type="button" aria-expanded={open} aria-controls={`service-panel-${index}`} onClick={() => setOpenCapability(open ? null : index)}>
                    <span>{String(index + 1).padStart(2, '0')}</span><strong>{capability.title}</strong>{open ? <Minus aria-hidden="true" /> : <ArrowDownRight aria-hidden="true" />}
                  </button>
                  <div id={`service-panel-${index}`} className="service__panel" aria-hidden={!open}>
                    <div className="service__panel-inner section-shell"><ul>{capability.items.map((item) => <li key={item}>{item}</li>)}</ul><p>{capability.summary}</p></div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="project" className="projects" aria-labelledby="project-title">
          <div className="section-shell projects__heading" data-animate="projects-heading">
            <h2 id="project-title"><span>SELECTED</span> <em>work</em></h2>
            <p>AI products, developer tools, health technology, and focused digital experiences built around practical problems.</p>
            <a href="#project-list" className="light-button">View projects <ArrowDownRight aria-hidden="true" /></a>
          </div>
          <div id="project-list" className="section-shell project-list">
            {featuredProjects.map((project, index) => (
              <article className="project" key={project.id} data-animate="project">
                <div className={`project__media project__media--${index + 1}`}>
                  {project.image ? <img src={project.image} alt={`${project.title} project preview`} width="1600" height="1000" loading="lazy" /> : (
                    <div className="project__placeholder" aria-label={`${project.title} screenshot placeholder`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{project.mark}</strong><small>Project screenshot to be added</small></div>
                  )}
                </div>
                <div className="project__body">
                  <span className="project__number">{String(index + 1).padStart(2, '0')}</span><h3>{project.mark}</h3><p>{project.fullDescription}</p>
                  <ul className="project__tech" aria-label={`${project.title} technologies`}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                  <div className="project__actions">
                    {project.liveUrl && <a className="primary-link" href={project.liveUrl} target="_blank" rel="noreferrer">Live demo <ArrowUpRight aria-hidden="true" /></a>}
                    {project.githubUrl && <a className="secondary-link" href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight aria-hidden="true" /></a>}
                    {!project.liveUrl && !project.githubUrl && <span className="link-pending">Project link coming later</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="lab" className="lab" aria-labelledby="lab-title">
          <div className="section-shell lab__intro" data-animate="lab-heading"><h2 id="lab-title">Ideas still in motion.</h2><p>Three projects whose live links and screenshots will be added when they are ready.</p></div>
          <div className="lab-rail" role="list" aria-label="Projects in progress">
            {labProjects.map((project, index) => (
              <article className="lab-card" role="listitem" key={project.id} data-animate="lab-card" style={{ '--motion-index': index } as CSSProperties}>
                <div className="lab-card__preview" aria-hidden="true"><span>{String(index + 5).padStart(2, '0')}</span><strong>{project.mark}</strong></div>
                <div className="lab-card__body"><div><h3>{project.title}</h3><span>{project.status}</span></div><p>{project.shortDescription}</p><ul>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>
              </article>
            ))}
            <article className="lab-card lab-card--education" role="listitem" data-animate="lab-card" style={{ '--motion-index': labProjects.length } as CSSProperties}>
              <div className="lab-card__preview"><span>2027</span><strong>B.TECH<br />AI &amp; ML</strong></div>
              <div className="lab-card__body"><div><h3>Education</h3><span>Expected 2027</span></div><p>{portfolio.college}, Hyderabad.</p></div>
            </article>
          </div>
        </section>

        <section className="education" aria-labelledby="education-title" data-animate="education">
          <div className="education__year" aria-hidden="true">2027</div>
          <div className="section-shell education__content"><p>{portfolio.education}</p><h2 id="education-title">Computer science, shaped by making.</h2><div><p>{portfolio.college}</p><p>{portfolio.location}</p></div></div>
        </section>
      </main>

      <footer id="contact" className="contact" aria-labelledby="contact-title">
        <div className="contact__backdrop" aria-hidden="true" />
        <div className="section-shell contact__inner" data-animate="contact">
          <p className="availability"><span /> {portfolio.availability}</p>
          <h2 id="contact-title">Get in touch</h2>
          <p className="contact__lede">Interested in meaningful projects, opportunities to learn, and conversations with people who enjoy building useful products.</p>
          {(portfolio.email || portfolio.resumeUrl) && <div className="contact__actions">{portfolio.email && <a className="light-button" href={`mailto:${portfolio.email}`}>Send an email</a>}{portfolio.resumeUrl && <a className="outline-button" href={portfolio.resumeUrl} target="_blank" rel="noreferrer">View résumé <ArrowUpRight aria-hidden="true" /></a>}</div>}
          {(portfolio.githubUrl || portfolio.linkedinUrl) && <div className="contact__socials" aria-label="Social profiles">
            {portfolio.githubUrl && <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" aria-label="Aman Kumar Sharma on GitHub" title="GitHub"><Github aria-hidden="true" /></a>}
            {portfolio.linkedinUrl && <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" aria-label="Aman Kumar Sharma on LinkedIn" title="LinkedIn"><Linkedin aria-hidden="true" /></a>}
          </div>}
          <div className="contact-card">
            {portfolio.email && <a href={`mailto:${portfolio.email}`}><span>Email</span><strong>{portfolio.email}</strong><ArrowUpRight aria-hidden="true" /></a>}
            {portfolio.phone && <a href={`tel:${portfolio.phone}`}><span>Phone</span><strong>{portfolio.phone}</strong><ArrowUpRight aria-hidden="true" /></a>}
            <div><span>Based in</span><strong>{portfolio.location}</strong></div>
          </div>
          <div className="contact__footer"><span>© {new Date().getFullYear()} {portfolio.displayName}</span><nav aria-label="Footer navigation">{navItems.slice(0, 4).map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav></div>
        </div>
      </footer>
    </>
  )
}
