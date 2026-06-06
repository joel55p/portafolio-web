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

//-------

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

  /* actualiza la seccion activa segun el scroll */
  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(id => document.getElementById(id))
      const scrollY = window.scrollY + 120
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) {
          setActive(NAV_ITEMS[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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
          {NAV_ITEMS.map(id => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'var(--font-mono)', fontSize: '12px',
              color: active === id ? 'var(--accent)' : 'var(--text-2)',
              transition: 'color 0.2s', letterSpacing: '0.05em',
            }}>
              {active === id ? `[${id}]` : id}
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