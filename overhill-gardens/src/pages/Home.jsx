import gardenPhoto from '../assets/garden.jpg'

export default function Home({ setActivePage }) {
  const navigate = (page) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fade-up" style={{ paddingTop: '72px' }}>

      {/* HERO */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        minHeight: 'calc(100vh - 72px)',
        background: 'var(--cream)',
      }}>
        {/* Left */}
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(3rem,8vw,7rem) clamp(2rem,6vw,6rem)',
        }}>
          <span className="eyebrow">East Tennessee Native Plant Nursery</span>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.8rem,5vw,5rem)',
            fontWeight: 300, lineHeight: 1.08,
            color: 'var(--charcoal)', marginBottom: '1.75rem',
          }}>
            Where your{' '}
            <em style={{ color: 'var(--moss)', fontStyle: 'italic' }}>natural garden</em>
            {' '}experience begins.
          </h1>
          <p style={{
            fontSize: '1rem', fontWeight: 300, lineHeight: 1.85,
            color: 'var(--text-muted)', maxWidth: '44ch', marginBottom: '2.5rem',
          }}>
            At Overhill Gardens of East Tennessee, our mission is to model and
            encourage beautiful and sustainable landscapes by providing high-quality,
            nursery-propagated native plants and design/build services for natural
            gardening and habitat development.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => navigate('nursery')}>
              Explore the Nursery
            </button>
            <button className="btn-outline" onClick={() => navigate('landscaping')}>
              Landscaping Services
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '3rem', marginTop: '4rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid var(--border)',
          }}>
            {[
              { num: '500+', label: 'Native Species' },
              { num: '25+',  label: 'Years Growing' },
              { num: '0',    label: 'Pesticides Used' },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '2.4rem', fontWeight: 300, color: 'var(--moss)', lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontSize: '0.7rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.3rem',
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right image */}
        <div style={{ position: 'relative', overflow: 'hidden', minHeight: '500px' }}>
          <img
            src={gardenPhoto}
            alt="Native garden in bloom"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(61,90,47,0.12), transparent 55%)',
          }} />
        </div>
      </div>

      {/* INTRO BAND */}
      <div style={{
        background: 'var(--charcoal)',
        padding: '5rem clamp(2rem,8vw,8rem)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 300,
          color: 'var(--cream)', maxWidth: '70ch', margin: '0 auto',
          lineHeight: 1.5,
        }}>
          Whether we help choose the perfect plant for your garden or design and
          install your entire landscape, we believe that{' '}
          <em style={{ color: 'var(--sage)', fontStyle: 'italic' }}>
            nurturing natural systems is an essential approach for our times.
          </em>
        </h2>
        <p style={{
          fontSize: '0.88rem', color: 'rgba(245,240,232,0.5)',
          marginTop: '1.5rem', letterSpacing: '0.05em',
        }}>
          We hope you'll join us in creating a legacy of sound stewardship!
        </p>
      </div>

      {/* TWO COLUMN CARDS */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '2px', background: 'var(--parchment-dark)',
      }}>
        {/* Nursery card */}
        <div
          onClick={() => navigate('nursery')}
          style={{
            background: 'var(--white)', padding: '4rem clamp(2rem,5vw,5rem)',
            cursor: 'pointer', transition: 'background 0.25s',
            position: 'relative', overflow: 'hidden',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--cream)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--white)'}
        >
          <span className="eyebrow">Native Plant Nursery</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem,2.5vw,2.8rem)', fontWeight: 300,
            color: 'var(--charcoal)', marginBottom: '1.2rem', lineHeight: 1.15,
          }}>
            Seasoned growers of <em style={{ color: 'var(--moss)', fontStyle: 'italic' }}>fine native plants</em>
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '44ch' }}>
            One of the widest selections of native plants in the eastern U.S. —
            grown organically, locally, and with genuine care for genetic diversity.
          </p>
          <span style={{
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--moss)',
          }}>Browse Plants →</span>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
            background: 'var(--moss)',
          }} />
        </div>

        {/* Landscaping card */}
        <div
          onClick={() => navigate('landscaping')}
          style={{
            background: 'var(--moss)', padding: '4rem clamp(2rem,5vw,5rem)',
            cursor: 'pointer', transition: 'background 0.25s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--moss-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--moss)'}
        >
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.68rem',
            fontWeight: 500, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--sage-light)',
            marginBottom: '0.75rem', display: 'block',
          }}>Landscaping Services</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem,2.5vw,2.8rem)', fontWeight: 300,
            color: 'var(--cream)', marginBottom: '1.2rem', lineHeight: 1.15,
          }}>
            Landscapes that{' '}
            <em style={{ color: 'var(--sage-light)', fontStyle: 'italic' }}>belong here</em>
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'rgba(245,240,232,0.75)', lineHeight: 1.85, marginBottom: '2rem', maxWidth: '44ch' }}>
            Custom design and installation using high-quality, locally grown native
            plants. From hardscapes in natural stone to restoration ecology.
          </p>
          <span style={{
            fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--sage-light)',
          }}>View Services →</span>
        </div>
      </div>

      {/* CONTACT BAND */}
      <div style={{
        background: 'var(--parchment)',
        padding: '3rem 4vw',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
      }}>
        <p style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: '0.82rem', letterSpacing: '0.04em',
          color: 'var(--text-muted)',
        }}>
          Overhill Gardens · 1404 Citico Road · Vonore, TN 37885 &nbsp;·&nbsp;
          <strong>tel</strong> <a href="tel:4232952288" style={{ color: 'var(--moss)' }}>423.295.2288</a>
          &nbsp;·&nbsp;
          <strong>fax</strong> 423.295.2252 &nbsp;·&nbsp;
          <strong>mobile</strong> 423.295.5003
        </p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <a href="mailto:avi@overhillgardens.com" style={{ color: 'var(--moss)' }}>avi@overhillgardens.com</a>
          &nbsp;·&nbsp;
          <button
            onClick={() => navigate('contact')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--moss)', fontFamily: "'Jost',sans-serif", fontSize: '0.82rem' }}
          >Contact Us</button>
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}