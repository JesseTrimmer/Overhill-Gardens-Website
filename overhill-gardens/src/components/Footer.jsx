export default function Footer({ setActivePage }) {
  const navigate = (page) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer style={{
      background: 'var(--charcoal)',
      color: 'rgba(245,240,232,0.55)',
      padding: '3.5rem 4vw 2rem',
      marginTop: '0',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr',
        gap: '3vw', marginBottom: '2.5rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.5rem', fontWeight: 600,
            color: 'var(--cream)', marginBottom: '1rem',
            letterSpacing: '0.01em',
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
            <a href="mailto:avi@overhillgardens.com" style={{ color: 'var(--sage-light)' }}>
              avi@overhillgardens.com
            </a>
          </p>
        </div>

        {/* Nursery */}
        <div>
          <h4 style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.68rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--sage)',
            marginBottom: '1.2rem', fontWeight: 500,
          }}>Native Plant Nursery</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Browse Our Plants','How to Purchase','All About Natives','Tour the Nursery','Calendar of Events','Gardener Resources'].map(item => (
              <li key={item}>
                <button
                  onClick={() => navigate('nursery')}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.83rem', color: 'rgba(245,240,232,0.55)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'color 0.2s', textAlign: 'left',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--sage-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.55)'}
                >– {item}</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Landscaping */}
        <div>
          <h4 style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.68rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--sage)',
            marginBottom: '1.2rem', fontWeight: 500,
          }}>Landscaping Services</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {['Design Approach','Landscape Gallery','Hardscape Gallery','Commercial Portfolio','Restoration Ecology','Start Your Project'].map(item => (
              <li key={item}>
                <button
                  onClick={() => navigate('landscaping')}
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: '0.83rem', color: 'rgba(245,240,232,0.55)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'color 0.2s', textAlign: 'left',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--sage-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.55)'}
                >– {item}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid rgba(245,240,232,0.1)',
        paddingTop: '1.5rem',
        display: 'flex', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '0.5rem',
        fontSize: '0.75rem',
      }}>
        <span>East Tennessee Native Plant Nursery</span>
        <span>Sustainable Landscaping Design and Installation for Knoxville, TN and surrounding cities</span>
      </div>
    </footer>
  )
}