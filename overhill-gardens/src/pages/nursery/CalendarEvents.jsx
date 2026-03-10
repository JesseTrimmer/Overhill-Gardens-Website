export default function CalendarEvents() {
  return (
    <div>
      <span className="eyebrow">Native Plant Nursery</span>
      <h2 className="section-title">Calendar of <em>Events</em></h2>

      <div style={{
        borderLeft: '3px solid var(--clay)',
        paddingLeft: '1.5rem', marginBottom: '2.5rem',
      }}>
        <div style={{
          fontFamily: "'Jost', sans-serif", fontSize: '0.68rem',
          fontWeight: 500, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--clay)',
          marginBottom: '0.5rem',
        }}>Fall Open House</div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.4rem', fontWeight: 400,
          color: 'var(--charcoal)', marginBottom: '0.75rem',
        }}>October 2021</h3>
        <p style={{ fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--text-muted)', maxWidth: '55ch' }}>
          Because our open house was canceled last year, we're making the entire month
          of October 2021 our open house! Please visit our Overhill Gardens Facebook
          page for up-to-date information. We look forward to meeting new friends and
          reconnecting with old friends. Happy planting!
        </p>
      </div>

      <div className="divider" />

      <div style={{
        background: 'var(--parchment)',
        padding: '2rem',
        border: '1px solid var(--border)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📅</div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.4rem', fontWeight: 300,
          color: 'var(--charcoal)', marginBottom: '0.75rem',
        }}>Stay Up to Date</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          For the most current event information, check our Facebook page or sign up
          for our e-newsletter below.
        </p>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
          style={{ fontSize: '0.72rem' }}
        >
          Visit Our Facebook
        </a>
      </div>

      <div className="divider" />

      <div style={{
        background: 'var(--moss)', padding: '2rem',
        display: 'flex', gap: '1.5rem', alignItems: 'center',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.68rem',
            fontWeight: 500, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--sage-light)',
            marginBottom: '0.5rem',
          }}>Newsletter</div>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.3rem', fontWeight: 300,
            color: 'var(--cream)',
          }}>Sign up for our E-Newsletter</h3>
        </div>
        <a
          href="mailto:avi@overhillgardens.com?subject=Newsletter Signup"
          className="btn-primary"
          style={{ background: 'var(--white)', color: 'var(--moss)', flexShrink: 0 }}
        >
          Sign Up
        </a>
      </div>
    </div>
  )
}