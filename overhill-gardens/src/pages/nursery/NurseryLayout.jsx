import { Outlet, NavLink } from 'react-router-dom'

const NURSERY_PAGES = [
  { path: 'browse-plants',     label: 'Browse Our Plants' },
  { path: 'how-to-purchase',   label: 'How to Purchase' },
  { path: 'all-about-natives', label: 'All About Natives' },
  { path: 'tour',              label: 'Tour the Nursery' },
  { path: 'calendar',          label: 'Calendar of Events' },
  { path: 'resources',         label: 'Gardener Resources' },
]

export default function NurseryLayout() {
  return (
    <div className="page-wrapper fade-up" style={{ paddingTop: '72px' }}>
      <div style={{ background: 'var(--moss)', padding: '2.5rem 4vw', borderBottom: '1px solid var(--moss-dark)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--sage-light)' }}>
            Native Plant Nursery
          </span>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, color: 'var(--cream)', marginTop: '0.4rem' }}>
            Overhill Gardens Nursery
          </h1>
        </div>
      </div>

      <div className="inner-layout">
        <div className="inner-content">
          <Outlet />
        </div>
        <div className="inner-sidebar">
          <ul className="sidebar-nav">
            {NURSERY_PAGES.map(p => (
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