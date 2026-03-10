import { useState } from 'react'

export default function StartProject() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>
          Thank you, <em>{form.name || 'friend'}</em>!
        </h2>
        <p className="section-body" style={{ maxWidth: '44ch', margin: '0 auto' }}>
          We've received your message and will be in touch shortly. We look forward
          to helping you create a beautiful native landscape.
        </p>
      </div>
    )
  }

  return (
    <div>
      <span className="eyebrow">Landscaping Services</span>
      <h2 className="section-title">Start Your <em>Project</em></h2>

      <p className="section-body">
        Ready to begin? Tell us a bit about your project and we'll get back to you
        to discuss how we can help create a beautiful, sustainable native landscape.
      </p>

      <div className="divider" />

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block', fontSize: '0.68rem', fontWeight: 500,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: '0.5rem',
            }}>Name *</label>
            <input
              type="text" required
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              style={{
                width: '100%', padding: '0.75rem 1rem',
                background: 'var(--white)',
                border: '1px solid var(--border)',
                fontFamily: "'Jost',sans-serif", fontSize: '0.9rem',
                color: 'var(--text)', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--moss)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div>
            <label style={{
              display: 'block', fontSize: '0.68rem', fontWeight: 500,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--text-muted)', marginBottom: '0.5rem',
            }}>Email *</label>
            <input
              type="email" required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              style={{
                width: '100%', padding: '0.75rem 1rem',
                background: 'var(--white)',
                border: '1px solid var(--border)',
                fontFamily: "'Jost',sans-serif", fontSize: '0.9rem',
                color: 'var(--text)', outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--moss)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>

        <div>
          <label style={{
            display: 'block', fontSize: '0.68rem', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '0.5rem',
          }}>I'm Interested In</label>
          <select
            value={form.interest}
            onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
            style={{
              width: '100%', padding: '0.75rem 1rem',
              background: 'var(--white)',
              border: '1px solid var(--border)',
              fontFamily: "'Jost',sans-serif", fontSize: '0.9rem',
              color: 'var(--text)', outline: 'none',
            }}
          >
            <option value="">Select a service…</option>
            <option>Landscape Design & Installation</option>
            <option>Hardscape Construction</option>
            <option>Restoration Ecology</option>
            <option>Commercial Landscaping</option>
            <option>Consultation Only</option>
          </select>
        </div>

        <div>
          <label style={{
            display: 'block', fontSize: '0.68rem', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--text-muted)', marginBottom: '0.5rem',
          }}>Tell Us About Your Project</label>
          <textarea
            rows={5}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Describe your property, goals, timeline…"
            style={{
              width: '100%', padding: '0.75rem 1rem',
              background: 'var(--white)',
              border: '1px solid var(--border)',
              fontFamily: "'Jost',sans-serif", fontSize: '0.9rem',
              color: 'var(--text)', outline: 'none', resize: 'vertical',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--moss)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '0.9rem 2.5rem' }}>
          Send Message
        </button>
      </form>
    </div>
  )
}