import { Outlet, NavLink } from 'react-router-dom'

const LANDSCAPE_PAGES = [
  { path: 'design-approach',     label: 'Design Approach' },
  { path: 'gallery',             label: 'Landscape Gallery' },
  { path: 'hardscape',           label: 'Hardscape Gallery' },
  { path: 'commercial',          label: 'Commercial Portfolio' },
  { path: 'restoration-ecology', label: 'Restoration Ecology' },
  { path: 'start-project',       label: 'Start Your Project' },
]

export default function LandscapingLayout() {
  return (
    <div className="page-wrapper fade-up" style={{ paddingTop: '72px' }}>
      <div style={{ background: 'var(--charcoal)', padding: '2.5rem 4vw', borderBottom: '3px solid var(--moss)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sage)' }}>
            Landscaping Services
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--cream)', marginTop: '0.4rem' }}>
            Welcome to our gardens…
          </h1>
        </div>
      </div>

      <div className="inner-layout">
        <div className="inner-content">
          <Outlet />
        </div>
        <div className="inner-sidebar">
          <ul className="sidebar-nav">
            {LANDSCAPE_PAGES.map(p => (
              <li key={p.path}>
                <NavLink to={p.path}>– {p.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}