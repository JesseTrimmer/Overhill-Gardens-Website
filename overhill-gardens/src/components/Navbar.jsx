import { useState, useEffect } from 'react'
import logo from '../assets/logo.jpg'

export default function Navbar({ activePage, setActivePage }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { id: 'home',        label: 'Home' },
    { id: 'nursery',     label: 'Native Plant Nursery' },
    { id: 'landscaping', label: 'Landscaping Services' },
    { id: 'contact',     label: 'Contact Us' },
  ]

  const handleNav = (id) => {
    setActivePage(id)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 4vw',
        background: scrolled
          ? 'rgba(245,240,232,0.97)'
          : 'rgba(245,240,232,0.95)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled
          ? '1px solid rgba(61,90,47,0.18)'
          : '1px solid rgba(61,90,47,0.10)',
        boxShadow: scrolled ? '0 2px 20px rgba(42,42,40,0.07)' : 'none',
        transition: 'all 0.3s',
      }}>

        {/* LOGO */}
        <button
          onClick={() => handleNav('home')}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >
          <img
  src={logo}
  alt="Overhill Gardens"
  style={{ height: '55px', width: 'auto' }}
/>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.25rem', fontWeight: 600,
            color: 'var(--moss)', letterSpacing: '0.01em',
            lineHeight: 1.2,
          }}>
            Overhill<br />
            <span style={{ color: 'var(--bark)', fontStyle: 'italic', fontWeight: 400 }}>Gardens</span>
          </span>
        </button>

        {/* DESKTOP NAV */}
        <ul style={{
          display: 'flex', gap: '0', listStyle: 'none',
          alignItems: 'center',
        }} className="desktop-nav">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => handleNav(item.id)}
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.78rem', fontWeight: activePage === item.id ? 500 : 400,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: activePage === item.id ? 'var(--moss)' : 'var(--text)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '0.5rem 1.1rem',
                  borderBottom: activePage === item.id
                    ? '2px solid var(--moss)'
                    : '2px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  if (activePage !== item.id) e.currentTarget.style.color = 'var(--moss)'
                }}
                onMouseLeave={e => {
                  if (activePage !== item.id) e.currentTarget.style.color = 'var(--text)'
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* HAMBURGER */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{
            display: 'none', flexDirection: 'column', gap: '5px',
            background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
          }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px',
              background: 'var(--moss)',
              transform: mobileOpen
                ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                : 'scaleX(0)'
                : 'none',
              transition: 'transform 0.25s',
            }} />
          ))}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 199,
          background: 'var(--cream)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'flex-start', padding: '0 8vw',
          gap: '1.5rem',
        }}>
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2.2rem', fontWeight: 300,
                color: activePage === item.id ? 'var(--moss)' : 'var(--charcoal)',
                background: 'none', border: 'none', cursor: 'pointer',
                animation: `fadeUp 0.4s ${i * 0.08}s both`,
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}