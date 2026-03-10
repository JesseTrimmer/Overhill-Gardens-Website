import { useState } from 'react'
import DesignApproach from './DesignApproach'
import LandscapeGallery from './LandscapeGallery'
import HardscapeGallery from './HardscapeGallery'
import CommercialPortfolio from './CommercialPortfolio'
import RestorationEcology from './RestorationEcology'
import StartProject from './StartProject'

const LANDSCAPE_PAGES = [
  { id: 'design',      label: 'Design Approach',      Component: DesignApproach },
  { id: 'landscape',   label: 'Landscape Gallery',     Component: LandscapeGallery },
  { id: 'hardscape',   label: 'Hardscape Gallery',     Component: HardscapeGallery },
  { id: 'commercial',  label: 'Commercial Portfolio',  Component: CommercialPortfolio },
  { id: 'restoration', label: 'Restoration Ecology',   Component: RestorationEcology },
  { id: 'start',       label: 'Start Your Project',    Component: StartProject },
]

export default function LandscapingShell() {
  const [activeSub, setActiveSub] = useState('design')

  const handleSub = (id) => {
    setActiveSub(id)
    window.scrollTo({ top: 72, behavior: 'smooth' })
  }

  const Active = LANDSCAPE_PAGES.find(p => p.id === activeSub)?.Component

  return (
    <div className="page-wrapper fade-up" style={{ paddingTop: '72px' }}>
      {/* Page header */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '2.5rem 4vw',
        borderBottom: '3px solid var(--moss)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.68rem',
            fontWeight: 500, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--sage)',
          }}>Landscaping Services</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300,
            color: 'var(--cream)', marginTop: '0.4rem',
          }}>
            Welcome to our gardens…
          </h1>
        </div>
      </div>

      <div className="inner-layout">
        <div className="inner-content">
          {Active && <Active onNavigate={handleSub} />}
        </div>
        <div className="inner-sidebar">
          <ul className="sidebar-nav">
            {LANDSCAPE_PAGES.map(p => (
              <li key={p.id}>
                <button
                  className={activeSub === p.id ? 'active' : ''}
                  onClick={() => handleSub(p.id)}
                >
                  – {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}