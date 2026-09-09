import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { path: '/',            label: 'Home', end: true },
    { path: '/nursery',     label: 'Native Plant Nursery' },
    { path: '/landscaping', label: 'Landscaping Services' },
    { path: '/contact',     label: 'Contact Us' },
  ]

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '72px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 4vw',
        background: scrolled ? 'rgba(245,240,232,0.97)' : 'rgba(245,240,232,0.95)',
        backdropFilter: 'blur(14px)',
        borderBottom: scrolled ? '1px solid rgba(61,90,47,0.18)' : '1px solid rgba(61,90,47,0.10)',
        boxShadow: scrolled ? '0 2px 20px rgba(42,42,40,0.07)' : 'none',
        transition: 'all 0.3s',
      }}>

        <Link
          to="/"
          onClick={closeMobile}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', transition: 'transform 0.25s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img
            src={logo}
            alt="Overhill Gardens"
            style={{
              height: scrolled ? '58px' : '70px',
              width: 'auto',
              transition: 'height 0.3s ease',
            }}
          />
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1.15,
            fontSize: scrolled ? '1.3rem' : '1.55rem',
            transition: 'font-size 0.3s ease',
            color: 'var(--moss)',
          }}>
            Overhill<br />
            <span style={{ color: 'var(--bark)', fontStyle: 'italic', fontWeight: 400 }}>Gardens</span>
          </span>
        </Link>

        <ul style={{ display: 'flex', gap: 0, listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
          {navItems.map(item => (
            <li key={item.path}>
              <NavLink to={item.path} end={item.end} className="nav-link">
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px' }}
          className="hamburger"
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: '24px', height: '2px', background: 'var(--moss)',
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

      {mobileOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 199, background: 'var(--cream)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'flex-start', padding: '0 8vw', gap: '1.5rem',
        }}>
          {navItems.map((item, i) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={closeMobile}
              className="nav-link-mobile"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {item.label}
            </NavLink>
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