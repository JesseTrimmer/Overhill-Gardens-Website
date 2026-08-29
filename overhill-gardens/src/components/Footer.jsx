import { Link } from 'react-router-dom'

const nurseryLinks = [
  { label: 'Browse Our Plants',  path: '/nursery/browse-plants' },
  { label: 'How to Purchase',    path: '/nursery/how-to-purchase' },
  { label: 'All About Natives',  path: '/nursery/all-about-natives' },
  { label: 'Tour the Nursery',   path: '/nursery/tour' },
  { label: 'Calendar of Events', path: '/nursery/calendar' },
  { label: 'Gardener Resources', path: '/nursery/resources' },
]

const landscapingLinks = [
  { label: 'Design Approach',      path: '/landscaping/design-approach' },
  { label: 'Landscape Gallery',    path: '/landscaping/gallery' },
  { label: 'Hardscape Gallery',    path: '/landscaping/hardscape' },
  { label: 'Commercial Portfolio', path: '/landscaping/commercial' },
  { label: 'Restoration Ecology',  path: '/landscaping/restoration-ecology' },
  { label: 'Start Your Project',   path: '/landscaping/start-project' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'rgba(245,240,232,0.55)', padding: '3.5rem 4vw 2rem' }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
        gap: '3vw', marginBottom: '2.5rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 600,
            color: 'var(--cream)', marginBottom: '1rem', letterSpacing: '0.01em',
          }}>
            Overhill <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 400 }}>Gardens</span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.8, maxWidth: '34ch' }}>
            East Tennessee Native Plant Nursery & Garden Center.<br />
            1404 Citico Road · Vonore, TN 37885
          </p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.75rem' }}>
            tel <a href="tel:4232952288" style={{ color: 'var(--sage-light)' }}>423.295.2288</a>
            &nbsp;·&nbsp; mobile 423.295.5003
          </p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
            <a href="mailto:avi@overhillgardens.com" style={{ color: 'var(--sage-light)' }}>avi@overhillgardens.com</a>
          </p>
        </div>

        {/* Nursery */}
        <div>
          <h4 style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '1.2rem', fontWeight: 500,
          }}>Native Plant Nursery</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {nurseryLinks.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.83rem', color: 'rgba(245,240,232,0.55)', display: 'inline-block', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--sage-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.55)'}
                >– {item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Landscaping */}
        <div>
          <h4 style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '1.2rem', fontWeight: 500,
          }}>Landscaping Services</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {landscapingLinks.map(item => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.83rem', color: 'rgba(245,240,232,0.55)', display: 'inline-block', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--sage-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.55)'}
                >– {item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(245,240,232,0.1)', paddingTop: '1.5rem',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem',
      }}>
        <span>East Tennessee Native Plant Nursery</span>
        <span>Sustainable Landscaping Design and Installation for Knoxville, TN and surrounding cities</span>
      </div>
    </footer>
  )
}