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
    <section
      id={id}
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
        ...style,
      }}
    >
      {children}
    </section>
  )
}

// -------

export default function App() {
  const [active, setActive] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* nav principal fija con blur */}
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

        {/* links de navegacion en desktop */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {NAV_ITEMS.map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: active === id ? 'var(--accent)' : 'var(--text-2)',
              transition: 'color 0.2s',
              letterSpacing: '0.05em',
            }}>
              {active === id ? `[${id}]` : id}
            </button>
          ))}
        </div>

        {/* boton hamburger para mobile */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', fontSize: '20px', display: 'none' }}
          className="hamburger"
          aria-label="menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* menu desplegable en mobile */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 99,
          background: 'var(--bg-2)', borderBottom: '1px solid var(--border)',
          padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
        }}>
          {NAV_ITEMS.map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '13px',
              color: active === id ? 'var(--accent)' : 'var(--text)',
              textAlign: 'left', padding: '0.25rem 0',
            }}>
              {active === id ? `> ${id}` : `  ${id}`}
            </button>
          ))}
        </div>
      )}

      <main style={{ paddingTop: '56px' }}>
        {/* secciones se agregan en commits siguientes */}
      </main>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-6px)} }
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
    
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '0.7rem 1.4rem',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border-2)'}`,
        color: hovered ? 'var(--accent)' : 'var(--text)',
        fontSize: '13px', letterSpacing: '0.05em',
        transition: 'border-color 0.2s, color 0.2s',
        textDecoration: 'none',
      }}
    >
      {label}
    </a>
  )
}