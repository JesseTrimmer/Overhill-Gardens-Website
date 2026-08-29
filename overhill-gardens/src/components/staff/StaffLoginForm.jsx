import { useState } from 'react'
import { useStaffAuth } from '../../context/StaffAuthContext'

export default function StaffLoginForm() {
  const { login, error, checking } = useStaffAuth()
  const [tokenInput, setTokenInput] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!tokenInput.trim()) return
    await login(tokenInput.trim())
  }

  return (
    <div style={{ background: 'var(--parchment)', border: '1px solid var(--border)', padding: '2rem', maxWidth: '480px' }}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', fontWeight: 300, color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
        Staff Access
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Paste your GitHub personal access token below to unlock inventory, event, and
        gallery uploads.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="password"
          value={tokenInput}
          onChange={e => setTokenInput(e.target.value)}
          placeholder="github_pat_..."
          style={{ width: '100%', padding: '0.75rem 1rem', background: 'var(--white)', border: '1px solid var(--border)', fontFamily: "'Jost',sans-serif", fontSize: '0.9rem', color: 'var(--text)', outline: 'none' }}
        />
        {error && <p style={{ fontSize: '0.8rem', color: '#a03d2f' }}>{error}</p>}
        <button type="submit" className="btn-primary" disabled={checking} style={{ alignSelf: 'flex-start' }}>
          {checking ? 'Checking…' : 'Unlock Staff Tools'}
        </button>
      </form>
    </div>
  )
}