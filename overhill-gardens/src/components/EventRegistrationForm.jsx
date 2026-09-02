import { useState } from 'react'
import { formatDisplayDate } from '../lib/dateUtils'

const FORM_EMAIL = 'avi@overhillgardens.com' // change if registrations should go to a different inbox

export default function EventRegistrationForm({ event }) {
  const [open, setOpen] = useState(false)

  if (event.registrationEnabled === false) return null

  const redirectUrl = `${window.location.origin}${import.meta.env.BASE_URL}thank-you`

  const inputStyle = {
    width: '100%', padding: '0.65rem 0.85rem', background: 'var(--white)',
    border: '1px solid var(--border)', fontFamily: "'Jost',sans-serif",
    fontSize: '0.85rem', color: 'var(--text)', outline: 'none',
  }
  const labelStyle = {
    display: 'block', fontSize: '0.66rem', fontWeight: 500, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.4rem',
  }

  return (
    <div style={{ marginTop: '0.75rem' }}>
      <button onClick={() => setOpen(o => !o)} className="btn-outline" style={{ fontSize: '0.72rem', padding: '0.6rem 1.4rem' }}>
        {open ? 'Cancel' : 'Register for this Event →'}
      </button>

      {open && (
        <form
          action={`https://formsubmit.co/${FORM_EMAIL}`}
          method="POST"
          style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--parchment)', padding: '1.5rem', border: '1px solid var(--border)' }}
        >
          <input type="hidden" name="_subject" value={`Event Registration: ${event.title}`} />
          <input type="hidden" name="_next" value={redirectUrl} />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_autoresponse"
            value={`Thanks for registering for "${event.title}" on ${formatDisplayDate(event.date)}${event.time ? ` (${event.time})` : ''} at Overhill Gardens! We look forward to seeing you. If your plans change, just reply to this email to let us know.`}
          />
          <input type="hidden" name="Event" value={`${event.title} — ${formatDisplayDate(event.date)}`} />
          {/* Honeypot spam trap — must stay hidden and named _honey */}
          <input type="text" name="_honey" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

          <div>
            <label style={labelStyle}>Name *</label>
            <input style={inputStyle} type="text" name="name" required />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input style={inputStyle} type="email" name="email" required />
          </div>
          <div>
            <label style={labelStyle}>Phone</label>
            <input style={inputStyle} type="tel" name="phone" />
          </div>
          <div>
            <label style={labelStyle}>Number Attending</label>
            <select style={inputStyle} name="attendees" defaultValue="1">
              {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
              <option value="7+">7+</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Notes</label>
            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={3} name="notes" placeholder="Questions, dietary needs, anything else we should know" />
          </div>

          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>
            Submit Registration
          </button>
        </form>
      )}
    </div>
  )
}