import { useState, useEffect, useRef } from 'react'

// -------

const NAV_ITEMS = ['inicio', 'sobre mi', 'stack', 'proyectos', 'contacto']

// -------

function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// -------

function Section({ id, children, style }) {
  const [ref, inView] = useInView()
  return (
    <section id={id} ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(32px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
      ...style,
    }}>
      {children}
    </section>
  )
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '1.75rem 2rem',
        background: hovered ? 'var(--accent-dim)' : 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.2s', cursor: 'default',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
          <span style={{ color: 'var(--text-3)', fontSize: '11px' }}>{project.slug}</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.01em' }}>
            {project.name}
          </h3>
        </div>
        {/* badge live solo aparece si status es live */}
        {project.status === 'live' && (
          <span style={{
            fontSize: '10px', letterSpacing: '0.1em', padding: '3px 8px',
            border: '1px solid #ff4444', color: 'var(--text-3)',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            <span style={{
              display: 'inline-block', width: '6px', height: '6px',
              borderRadius: '50%', background: '#ff4444',
              animation: 'pulse 1.8s ease-out infinite',
            }} />
            live
          </span>
        )}
      </div>
      <p style={{ color: 'var(--text-2)', fontSize: '13px', lineHeight: 1.7, marginBottom: '1rem', maxWidth: '600px' }}>
        {project.desc}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontSize: '11px', padding: '2px 8px',
              background: 'var(--bg-3)', color: 'var(--text-2)',
              border: '1px solid var(--border)',
            }}>{t}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href={project.repo} style={{ fontSize: '12px', color: 'var(--text-3)' }} target="_blank" rel="noreferrer">repo ↗</a>
          {project.demo && <a href={project.demo} style={{ fontSize: '12px', color: 'var(--accent)' }} target="_blank" rel="noreferrer">demo ↗</a>}
        </div>
      </div>
    </div>
  )
}

// -------

const STACK = [
  { cat: 'Backend', items: ['Go', 'Node.js', 'Express', 'REST APIs', 'JWT Auth'] },
  { cat: 'Frontend', items: ['React', 'Vite', 'HTML/CSS', 'JavaScript'] },
  { cat: 'Deploy & Cloud', items: ['Vercel', 'Railway', 'GitHub Pages'] },
  { cat: 'Testing & Tools', items: ['Vitest', 'React Testing Library', 'Git', 'GitHub', 'Postman'] },
]

const PROJECTS = [
  {
    slug: '01',
    name: 'Chat en Tiempo Real — JS Vanilla + Go',
    desc: 'Chat funcional construido con JavaScript vanilla puro conectado a un servidor Go. Sin librerias externas: solo fetch(), DOM nativo y polling. Incluye preview de imagenes detectadas en mensajes, limite de 140 caracteres, auto-refresh cada segundo y scroll preservado al recibir nuevos mensajes.',
    tags: ['JavaScript', 'Go', 'DOM', 'HTML/CSS', 'fetch()'],
    status: null,
    repo: 'https://github.com/joel55p/Lab6-web',
    demo: null,
  },
  {
    slug: '02',
    name: 'Series Tracker — API REST Full Stack Go + SQLite + Vanilla JS',
    desc: 'Aplicacion full stack con separacion real de responsabilidades: backend en Go puro (sin frameworks) exponiendo una API REST con SQLite, y cliente en HTML + CSS + JavaScript vanilla consumiendola con fetch(). CRUD completo de series, busqueda, ordenamiento, paginacion, soporte de imagenes y CORS configurado manualmente. Dos repositorios independientes.',
    tags: ['Go', 'SQLite', 'REST API', 'JavaScript', 'Vercel', 'Railway'],
    status: 'live',
    repo: 'https://github.com/joel55p/web-frontend',
    demo: 'https://web-frontend-chi-five.vercel.app',
  },
  {
    slug: '03',
    name: 'Calculadora React — Componentes, Testing + Storybook',
    desc: 'Calculadora construida en React con arquitectura de componentes, testing con Vitest y React Testing Library, linting configurado y documentacion visual con Storybook. Maneja casos de borde: limite de 9 caracteres, overflow a error y resultados negativos.',
    tags: ['React', 'Vitest', 'React Testing Library', 'Storybook'],
    status: 'live',
    repo: 'https://github.com/joel55p/project2-web',
    demo: 'https://joelsiervas.online/24253/calculadora/',
  },
]

// ids usados en el nav — "sobre mi" tiene espacio, se mapea a id con guion bajo en el DOM
const NAV_ID_MAP = {
  'inicio': 'inicio',
  'sobre mi': 'sobre-mi',
  'stack': 'stack',
  'proyectos': 'proyectos',
  'contacto': 'contacto',
}

// -------

export default function App() {
  const [active, setActive] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [typed, setTyped] = useState('')
  const fullText = 'En proceso de ser desarrollador web full stack con enfoque en backend.'

  /* typing animation al montar el componente */
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      setTyped(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(id)
    }, 38)
    return () => clearInterval(id)
  }, [])

  /* actualiza la seccion activa segun el scroll usando los ids reales del dom */
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120
      let currentActive = 'inicio'
      for (const navLabel of NAV_ITEMS) {
        const domId = NAV_ID_MAP[navLabel]
        const el = document.getElementById(domId)
        if (el && el.offsetTop <= scrollY) {
          currentActive = navLabel
        }
      }
      setActive(currentActive)
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (navLabel) => {
    const domId = NAV_ID_MAP[navLabel]
    document.getElementById(domId)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '56px',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.02em' }}>
          <span style={{ color: 'var(--accent)' }}>{'>'}</span> portfolio
        </span>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {NAV_ITEMS.map(label => (
            <button key={label} onClick={() => scrollTo(label)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: active === label ? 'var(--accent)' : 'var(--text-2)',
              transition: 'color 0.2s', letterSpacing: '0.05em',
            }}>
              {active === label ? `[${label}]` : label}
            </button>
          ))}
        </div>
        <button onClick={() => setMenuOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', fontSize: '20px', display: 'none' }}
          className="hamburger" aria-label="menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {menuOpen && (
        <div style={{
          position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 99,
          background: 'var(--bg-2)', borderBottom: '1px solid var(--border)',
          padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
        }}>
          {NAV_ITEMS.map(label => (
            <button key={label} onClick={() => scrollTo(label)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '13px',
              color: active === label ? 'var(--accent)' : 'var(--text)',
              textAlign: 'left', padding: '0.25rem 0',
            }}>
              {active === label ? `> ${label}` : `  ${label}`}
            </button>
          ))}
        </div>
      )}

      <main style={{ paddingTop: '56px' }}>

        {/* hero: grid de dos columnas, texto izquierda y foto derecha */}
        <section id="inicio" style={{
          minHeight: 'calc(100vh - 56px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          padding: 'clamp(3rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)',
          position: 'relative', overflow: 'hidden',
          gap: '3rem',
        }}>
          {/* fondo con grid de lineas */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '48px 48px', opacity: 0.4,
          }} />
          {/* glow de acento */}
          <div style={{
            position: 'absolute', top: '20%', left: '-10%', width: '500px', height: '500px',
            background: 'radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* columna izquierda: texto y botones */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ color: 'var(--accent)', fontSize: '12px', letterSpacing: '0.15em', marginBottom: '1.5rem' }}>
              // Listo para empezar
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2.4rem, 5vw, 5rem)',
              lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: '1.5rem',
            }}>
              Hola, soy<br />
              <span style={{ color: 'var(--accent)' }}>Joel Nerio</span>
            </h1>
            <p style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)', color: 'var(--text-2)', maxWidth: '420px', marginBottom: '2.5rem', minHeight: '1.5em' }}>
              {typed}<span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)' }}>|</span>
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => scrollTo('proyectos')} style={{
                background: 'var(--accent)', color: '#000', border: 'none', cursor: 'pointer',
                padding: '0.7rem 1.6rem', fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600,
                letterSpacing: '0.05em', transition: 'opacity 0.2s',
              }}
                onMouseOver={e => e.target.style.opacity = '0.85'}
                onMouseOut={e => e.target.style.opacity = '1'}
              >ver proyectos →</button>
              <button onClick={() => scrollTo('contacto')} style={{
                background: 'transparent', color: 'var(--text)',
                border: '1px solid var(--border-2)', cursor: 'pointer',
                padding: '0.7rem 1.6rem', fontFamily: 'var(--font-mono)', fontSize: '13px',
                letterSpacing: '0.05em', transition: 'border-color 0.2s, color 0.2s',
              }}
                onMouseOver={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)' }}
                onMouseOut={e => { e.target.style.borderColor = 'var(--border-2)'; e.target.style.color = 'var(--text)' }}
              >contactar</button>
            </div>
          </div>

          {/* columna derecha: foto circular con borde degradado */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: '-3px',
                background: 'linear-gradient(135deg, var(--accent), transparent 60%)',
                borderRadius: '50%', zIndex: 0,
              }} />
              <img
                src="/joel1.jpeg"
                alt="Joel Nerio"
                style={{
                  position: 'relative', zIndex: 1,
                  width: 'clamp(220px, 25vw, 320px)',
                  height: 'clamp(220px, 25vw, 320px)',
                  objectFit: 'cover', objectPosition: 'center top',
                  borderRadius: '50%', border: '3px solid var(--bg)', display: 'block',
                }}
              />
              <div style={{
                position: 'absolute', inset: '-20px', zIndex: 0,
                background: 'radial-gradient(circle, rgba(77,166,255,0.12) 0%, transparent 70%)',
                borderRadius: '50%',
              }} />
            </div>
          </div>

          {/* indicador de scroll animado */}
          <div style={{
            position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
            color: 'var(--text-3)', fontSize: '11px', letterSpacing: '0.1em',
            animation: 'float 2s ease-in-out infinite',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          }}>
            <span>scroll</span><span>↓</span>
          </div>
        </section>

        {/* sobre mi: texto biografico y tabla de datos con bandera */}
        <Section id="sobre-mi" style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Label text="1. Sobre mi" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginTop: '2.5rem' }}>
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
                  lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: '1.25rem',
                }}>
                  En busca de backends<br />
                  <span style={{ color: 'var(--accent)' }}>que escalan.</span>
                </h2>
                <p style={{ color: 'var(--text-2)', lineHeight: 1.8, marginBottom: '1rem' }}>
                  Actualmente soy un estudiante de Ciencias de la Computacion y que le interesa en algun punto ser un desarrollador web con enfoque en backend y arquitectura de servidores. A lo largo del curso Sistemas y Tecnologia Web tuve la oportunidad de profundizar en Go, despliegue en Railway y construccion de APIs.
                </p>
                <p style={{ color: 'var(--text-2)', lineHeight: 1.8 }}>
                  Mi meta es trabajar en una startup tecnica que ayude a negocios pequenos y medianos a automatizar procesos mediante software bien construido.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { label: 'enfoque', value: 'Backend & Servers' },
                  { label: 'audiencia', value: 'Startups tecnicas B2B' },
                  { label: 'disponibilidad', value: 'Abierto a oportunidades' },
                  {
                    label: 'ubicacion',
                    value: (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <img src="/Guatemala.png" alt="Guatemala" style={{ width: '22px', height: '15px', objectFit: 'cover', borderRadius: '2px' }} />
                        Guatemala, Ciudad de Guatemala
                      </span>
                    )
                  },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem',
                  }}>
                    <span style={{ color: 'var(--text-3)', fontSize: '11px', letterSpacing: '0.1em' }}>{label}</span>
                    <span style={{ color: 'var(--text)', fontSize: '13px' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* stack: cuadricula de categorias y herramientas */}
        <Section id="stack" style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-2)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Label text="2. Stack" />
            <p style={{ color: 'var(--text-2)', marginTop: '0.75rem', marginBottom: '2.5rem' }}>
              Las herramientas que uso y por que las elegi.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', border: '1px solid var(--border)' }}>
              {STACK.map(({ cat, items }) => (
                <div key={cat} style={{ padding: '1.5rem', background: 'var(--bg)', borderRight: '1px solid var(--border)' }}>
                  <p style={{ color: 'var(--accent)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '1rem' }}>{cat}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {items.map(item => (
                      <span key={item} style={{ color: 'var(--text)', fontSize: '13px' }}>→ {item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--text-3)', fontSize: '12px', marginTop: '1.5rem', lineHeight: 1.7 }}>
              <span style={{ color: 'var(--accent)' }}>nota:</span> Importante mencionar que Vercel y Railway ofrecen el 80% del valor con mucho menos friccion operacional que AWS/Azure/GCP para startups pequenas.
            </p>
          </div>
        </Section>

        {/* proyectos: cards con badge live opcional */}
        <Section id="proyectos" style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Label text="3. Proyectos" />
            <p style={{ color: 'var(--text-2)', marginTop: '0.75rem', marginBottom: '2.5rem' }}>
              Trabajo real.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', border: '1px solid var(--border)' }}>
              {PROJECTS.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        </Section>

        {/* contacto: links a email, github y linkedin */}
        <Section id="contacto" style={{
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 4rem)',
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-2)',
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
            <Label text="4. Contacto" style={{ justifyContent: 'center' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              marginTop: '1.5rem', marginBottom: '1rem',
            }}>
              Hagamos algo<br /><span style={{ color: 'var(--accent)' }}>juntos.</span>
            </h2>
            <p style={{ color: 'var(--text-2)', marginBottom: '2.5rem' }}>
              Disponible para proyectos freelance, posiciones full-time, o simplemente para hablar de tech.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <ContactLink href="mailto:joelnerio72@gmail.com" label="@ email" />
              <ContactLink href="https://github.com/joel55p" label=" </> github" />
              <ContactLink href="https://www.linkedin.com/in/joel-nerio-071037393/" label="linkedin" />
            </div>
          </div>
        </Section>

        {/* footer con stack usado y nombre */}
        <footer style={{
          borderTop: '1px solid var(--border)',
          padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem',
          color: 'var(--text-3)', fontSize: '11px', letterSpacing: '0.05em',
        }}>
          <span>// built con React y Vite, deployed en Vercel</span>
          <span>{new Date().getFullYear()} — Joel Nerio</span>
        </footer>

      </main>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-6px)} }
        @keyframes pulse { 0%{box-shadow:0 0 0 0 rgba(255,68,68,0.6)} 70%{box-shadow:0 0 0 6px rgba(255,68,68,0)} 100%{box-shadow:0 0 0 0 rgba(255,68,68,0)} }
        .desktop-nav { display:flex!important }
        .hamburger { display:none!important }
        @media(max-width:640px){
          .desktop-nav{display:none!important}
          .hamburger{display:block!important}
          #inicio { grid-template-columns: 1fr !important; }
          #inicio > div:nth-child(3) { display: none !important; }
        }
      `}</style>
    </div>
  )
}

function Label({ text, style }) {
  return (
    <p style={{
      color: 'var(--accent)', fontSize: '11px', letterSpacing: '0.15em',
      display: 'flex', alignItems: 'center', gap: '0.5rem', ...style,
    }}>
      <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--accent)' }} />
      {text}
    </p>
  )
}

function ContactLink({ href, label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a href={href} target="_blank" rel="noreferrer"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        padding: '0.7rem 1.4rem',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border-2)'}`,
        color: hovered ? 'var(--accent)' : 'var(--text)',
        fontSize: '13px', letterSpacing: '0.05em',
        transition: 'border-color 0.2s, color 0.2s', textDecoration: 'none',
      }}
    >{label}</a>
  )
}