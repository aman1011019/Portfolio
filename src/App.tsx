import { useEffect, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Menu, Plus, X } from 'lucide-react'
import { projects } from './data/projects'

const navItems = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Capabilities', 'capabilities'],
  ['Projects', 'projects'],
  ['Education', 'education'],
  ['Contact', 'contact'],
] as const

const capabilities = [
  {
    title: 'Full-stack product development',
    summary:
      'I shape responsive interfaces and the services behind them, keeping the user flow, data model, and delivery path connected.',
    items: ['React interfaces', 'Python services', 'API design', 'Database-backed workflows'],
  },
  {
    title: 'AI systems and agents',
    summary:
      'I explore useful AI workflows: investigation agents, smaller-model datasets, automation, and product features that make intelligence practical.',
    items: ['AI agents', 'FastAPI', 'Synthetic data', 'Workflow automation'],
  },
  {
    title: 'Computer vision and OCR',
    summary:
      'I build concepts that turn visual input into clear next steps, with a focus on OCR, extraction, and accessible interfaces.',
    items: ['OCR pipelines', 'Computer vision', 'Document workflows', 'Accessible output'],
  },
  {
    title: 'Frontend and interaction',
    summary:
      'I care about interfaces that feel deliberate: strong hierarchy, responsive composition, useful motion, and clear feedback.',
    items: ['TypeScript', 'Responsive CSS', 'Interaction design', 'Product UI'],
  },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openCapability, setOpenCapability] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [introVisible, setIntroVisible] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setIntroVisible(false), reduced ? 80 : 1450)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.body.dataset.menuOpen = menuOpen ? 'true' : 'false'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
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
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActiveSection(visible.target.id)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.2, 0.6] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {introVisible && (
        <div className="intro-screen" aria-hidden="true">
          <div className="intro-screen__word">
            <span>PORT</span>
            <span>FOLIO</span>
          </div>
          <span className="intro-screen__dot" />
        </div>
      )}

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Aman Sharma, home" onClick={closeMenu}>
          AMAN SHARMA
        </a>
        <button
          className="menu-trigger"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span>INDEX</span>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      <nav id="site-menu" className={`site-menu ${menuOpen ? 'site-menu--open' : ''}`} aria-hidden={!menuOpen}>
        <div className="site-menu__inner">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? 'is-active' : undefined}
              tabIndex={menuOpen ? 0 : -1}
              onClick={closeMenu}
            >
              <span>{label}</span>
              <ArrowDownRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>

      <main>
        <section id="home" className={`hero ${!introVisible ? 'hero--ready' : ''}`} aria-labelledby="hero-title">
          <div className="hero__portrait-wrap" aria-hidden="true">
            <img
              className="hero__portrait"
              src="/aman-portrait.jpeg"
              alt=""
              width="1080"
              height="1440"
              fetchPriority="high"
            />
          </div>
          <div className="hero__content">
            <h1 id="hero-title">PORTFOLIO</h1>
            <div className="hero__baseline">
              <p>Full-Stack Developer &amp; AI/ML Engineer</p>
              <a className="round-link" href="#about" aria-label="Scroll to about">
                <ArrowDown aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about section-shell" aria-labelledby="about-title">
          <div className="about__title">
            <p className="plain-label">About Aman</p>
            <h2 id="about-title">Intro</h2>
          </div>
          <div className="about__copy">
            <p>
              I’m Aman Sharma, a computer science engineering student and developer passionate about building useful
              AI-powered products, intelligent systems, and polished digital experiences.
            </p>
            <p>
              I study Computer Science Engineering with an AI &amp; ML specialization at SVIT in Hyderabad, with
              graduation expected in 2027.
            </p>
          </div>
          <div className="stack-line" aria-label="Technical interests">
            <div className="stack-line__track">
              {[
                'React',
                'TypeScript',
                'Python',
                'FastAPI',
                'AI agents',
                'Machine learning',
                'Computer vision',
                'OCR',
                'PostgreSQL',
                'Product design',
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="capabilities" className="capabilities" aria-labelledby="capabilities-title">
          <div className="capabilities__heading section-shell">
            <h2 id="capabilities-title">WHAT I BUILD</h2>
          </div>
          <div className="capability-list">
            {capabilities.map((capability, index) => {
              const isOpen = openCapability === index
              return (
                <article key={capability.title} className={`capability ${isOpen ? 'capability--open' : ''}`}>
                  <button
                    type="button"
                    className="capability__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`capability-${index}`}
                    onClick={() => setOpenCapability(isOpen ? -1 : index)}
                  >
                    <span className="capability__number">{String(index + 1).padStart(2, '0')}</span>
                    <span>{capability.title}</span>
                    <Plus className="capability__icon" aria-hidden="true" />
                  </button>
                  <div id={`capability-${index}`} className="capability__panel" aria-hidden={!isOpen}>
                    <div className="capability__panel-inner section-shell">
                      <ul>
                        {capability.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <p>{capability.summary}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="projects" className="projects section-shell" aria-labelledby="projects-title">
          <div className="projects__head">
            <h2 id="projects-title">SELECTED WORK</h2>
            <p>
              Six projects across AI engineering, data, healthcare, productivity, mobile development, and frontend
              craft. Live links appear only where a working URL was supplied.
            </p>
          </div>

          <div className="project-list">
            {projects.map((project, index) => (
              <article key={project.id} className="project">
                <div className={`project__visual project__visual--${(index % 3) + 1}`} aria-hidden="true">
                  <span className="project__visual-index">{String(index + 1).padStart(2, '0')}</span>
                  <strong>{project.title}</strong>
                  <span>{project.category}</span>
                </div>
                <div className="project__body">
                  <div className="project__meta">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{project.status}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.fullDescription}</p>
                  <ul className="project__tech" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <div className="project__actions">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Open live demo <ArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        View GitHub <ArrowUpRight aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="education" aria-labelledby="education-title">
          <div className="education__year" aria-hidden="true">2027</div>
          <div className="education__content section-shell">
            <h2 id="education-title">Computer science, shaped by making.</h2>
            <div>
              <p>B.Tech in Computer Science Engineering, AI &amp; ML specialization.</p>
              <p>Swami Vivekanand Institute of Technology · Hyderabad, India · Expected 2027.</p>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="contact" aria-labelledby="contact-title">
        <div className="contact__content section-shell">
          <p className="contact__location">HYDERABAD · TELANGANA · INDIA</p>
          <h2 id="contact-title">Let’s build something useful.</h2>
          <p>
            I’m interested in full-stack applications, AI systems, automation, computer vision, and thoughtful product
            interfaces.
          </p>
        </div>
        <div className="contact__meta section-shell">
          <a href="#home">Aman Sharma</a>
          <span>Full-Stack Developer &amp; AI/ML Engineer</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  )
}

export default App
