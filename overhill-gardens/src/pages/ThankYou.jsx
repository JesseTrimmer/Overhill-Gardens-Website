import { Link } from 'react-router-dom'

export default function ThankYou() {
  return (
    <div className="fade-up" style={{ paddingTop: '72px', minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ maxWidth: '480px', padding: '3rem 2rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 300, color: 'var(--charcoal)', marginBottom: '1rem' }}>
          You're <em style={{ color: 'var(--moss)' }}>registered!</em>
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
          Thanks for signing up. A confirmation email is on its way to you now — we look
          forward to seeing you at Overhill Gardens.
        </p>
        <Link to="/nursery/calendar" className="btn-primary">Back to Calendar</Link>
      </div>
    </div>
  )
}