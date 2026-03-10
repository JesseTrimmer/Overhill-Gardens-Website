import { useState } from 'react'
import BrowsePlants from './BrowsePlants'
import HowToPurchase from './HowtoPurchase'
import AllAboutNatives from './AllAboutNatives'
import TourNursery from './TourNursery'
import CalendarEvents from './CalendarEvents'
import GardenerResources from './GardenerResources'

const NURSERY_PAGES = [
  { id: 'browse',    label: 'Browse Our Plants',  Component: BrowsePlants },
  { id: 'purchase',  label: 'How to Purchase',     Component: HowToPurchase },
  { id: 'natives',   label: 'All About Natives',   Component: AllAboutNatives },
  { id: 'tour',      label: 'Tour the Nursery',    Component: TourNursery },
  { id: 'calendar',  label: 'Calendar of Events',  Component: CalendarEvents },
  { id: 'resources', label: 'Gardener Resources',  Component: GardenerResources },
]

export default function NurseryShell() {
  const [activeSub, setActiveSub] = useState('browse')

  const handleSub = (id) => {
    setActiveSub(id)
    window.scrollTo({ top: 72, behavior: 'smooth' })
  }

  const Active = NURSERY_PAGES.find(p => p.id === activeSub)?.Component

  return (
    <div className="page-wrapper fade-up" style={{ paddingTop: '72px' }}>
      {/* Page header */}
      <div style={{
        background: 'var(--moss)',
        padding: '2.5rem 4vw',
        borderBottom: '1px solid var(--moss-dark)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.68rem',
            fontWeight: 500, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--sage-light)',
          }}>Native Plant Nursery</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300,
            color: 'var(--cream)', marginTop: '0.4rem',
          }}>
            Overhill Gardens Nursery
          </h1>
        </div>
      </div>

      <div className="inner-layout">
        {/* Main content */}
        <div className="inner-content">
          {Active && <Active />}
        </div>

        {/* Sidebar */}
        <div className="inner-sidebar">
          <ul className="sidebar-nav">
            {NURSERY_PAGES.map(p => (
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