import { useStaffAuth } from '../../context/StaffAuthContext'
import StaffLoginForm from './StaffLoginForm'

export default function StaffGate({ children }) {
  const { isStaff, staffName, logout } = useStaffAuth()

  if (!isStaff) return <StaffLoginForm />

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--moss)', color: 'var(--cream)', padding: '0.75rem 1.25rem', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
        <span>Signed in as staff{staffName ? ` (${staffName})` : ''}</span>
        <button onClick={logout} style={{ color: 'var(--sage-light)', textDecoration: 'underline', fontSize: '0.8rem' }}>Log out</button>
      </div>
      {children}
    </div>
  )
}