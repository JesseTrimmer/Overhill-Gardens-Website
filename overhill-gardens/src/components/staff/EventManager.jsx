import { useState } from 'react'
import { useStaffAuth } from '../../context/StaffAuthContext'
import { commitFile } from '../../lib/githubApi'
import { EVENTS_PATH } from '../../config/github'
import { formatDisplayDate } from '../../lib/dateUtils'

const CATEGORIES = ['Open House', 'Workshop', 'Sale', 'Class', 'Other']

const emptyForm = { id: null, title: '', date: '', endDate: '', time: '', category: 'Open House', location: '', description: '', registrationEnabled: true }

export default function EventManager({ currentEvents, onUpdated }) {
  const { token } = useStaffAuth()
  const [events, setEvents] = useState(currentEvents)
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.date) return

    const cleaned = {
      id: form.id || `event-${Date.now()}`,
      title: form.title.trim(),
      date: form.date,
      endDate: form.endDate || null,
      time: form.time.trim(),
      category: form.category,
      location: form.location.trim(),
      description: form.description.trim(),
      registrationEnabled: form.registrationEnabled,
    }

    setEvents(prev => {
      const exists = prev.some(ev => ev.id === cleaned.id)
      return exists ? prev.map(ev => ev.id === cleaned.id ? cleaned : ev) : [...prev, cleaned]
    })
    setForm(emptyForm)
  }

  const handleEdit = (ev) => setForm({ ...emptyForm, ...ev, endDate: ev.endDate || '', registrationEnabled: ev.registrationEnabled !== false })
  const handleDelete = (id) => setEvents(prev => prev.filter(ev => ev.id !== id))
  const handleCancelEdit = () => setForm(emptyForm)

  const handlePublish = async () => {
    setStatus('uploading')
    setMessage('')
    try {
      await commitFile({
        token,
        path: EVENTS_PATH,
        content: JSON.stringify(events, null, 2),
        message: `Update events (${events.length} total)`,
      })
      setStatus('done')
      setMessage('Published! The live site will update in 1–2 minutes once GitHub Pages rebuilds.')
      onUpdated?.(events)
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong publishing the changes.')
    }
  }

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
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', padding: '2rem' }}>
      <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '1.5rem' }}>
        {form.id ? 'Edit Event' : 'Add an Event'}
      </h4>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label style={labelStyle}>Title *</label>
          <input style={inputStyle} value={form.title} onChange={e => handleChange('title', e.target.value)} required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Date *</label>
            <input type="date" style={inputStyle} value={form.date} onChange={e => handleChange('date', e.target.value)} required />
          </div>
          <div>
            <label style={labelStyle}>End Date (multi-day only)</label>
            <input type="date" style={inputStyle} value={form.endDate} onChange={e => handleChange('endDate', e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={labelStyle}>Time</label>
            <input style={inputStyle} placeholder="e.g. 10am – 4pm" value={form.time} onChange={e => handleChange('time', e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select style={inputStyle} value={form.category} onChange={e => handleChange('category', e.target.value)}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Location</label>
          <input style={inputStyle} placeholder='Leave blank for "Overhill Gardens Nursery"' value={form.location} onChange={e => handleChange('location', e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, resize: 'vertical' }} rows={4} value={form.description} onChange={e => handleChange('description', e.target.value)} />
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text)' }}>
          <input type="checkbox" checked={form.registrationEnabled} onChange={e => handleChange('registrationEnabled', e.target.checked)} />
          Allow online registration for this event
        </label>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button type="submit" className="btn-primary">{form.id ? 'Save Changes' : 'Add Event'}</button>
          {form.id && <button type="button" className="btn-outline" onClick={handleCancelEdit}>Cancel</button>}
        </div>
      </form>

      <div className="divider" />

      <h5 style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        All Events ({events.length}) — not yet published
      </h5>

      {sorted.length === 0 && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No events yet — add one above.</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {sorted.map(ev => (
          <div key={ev.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: '0.88rem', color: 'var(--charcoal)' }}>{ev.title}</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{formatDisplayDate(ev.date)}{ev.endDate ? ` – ${formatDisplayDate(ev.endDate)}` : ''}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => handleEdit(ev)} style={{ fontSize: '0.78rem', color: 'var(--moss)', textDecoration: 'underline' }}>Edit</button>
              <button onClick={() => handleDelete(ev.id)} style={{ fontSize: '0.78rem', color: '#a03d2f', textDecoration: 'underline' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button className="btn-primary" onClick={handlePublish} disabled={status === 'uploading'} style={{ marginTop: '1.5rem' }}>
        {status === 'uploading' ? 'Publishing…' : 'Publish All Changes'}
      </button>

      {message && (
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: status === 'error' ? '#a03d2f' : 'var(--moss)' }}>
          {message}
        </p>
      )}
    </div>
  )
}