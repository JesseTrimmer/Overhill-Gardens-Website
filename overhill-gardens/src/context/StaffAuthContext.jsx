import { createContext, useContext, useState, useCallback } from 'react'
import { validateStaffToken } from '../lib/githubApi'

const StaffAuthContext = createContext(null)
const STORAGE_KEY = 'overhill_staff_token'

export function StaffAuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY))
  const [staffName, setStaffName] = useState(null)
  const [error, setError] = useState(null)
  const [checking, setChecking] = useState(false)

  const login = useCallback(async (newToken) => {
    setChecking(true)
    setError(null)
    try {
      const result = await validateStaffToken(newToken)
      if (!result.ok) {
        setError(result.message)
        setChecking(false)
        return false
      }
      localStorage.setItem(STORAGE_KEY, newToken)
      setToken(newToken)
      setStaffName(result.username)
      setChecking(false)
      return true
    } catch {
      setError('Could not verify token. Check your connection and try again.')
      setChecking(false)
      return false
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setToken(null)
    setStaffName(null)
  }, [])

  return (
    <StaffAuthContext.Provider value={{ token, staffName, isStaff: !!token, login, logout, error, checking }}>
      {children}
    </StaffAuthContext.Provider>
  )
}

export function useStaffAuth() {
  const ctx = useContext(StaffAuthContext)
  if (!ctx) throw new Error('useStaffAuth must be used within StaffAuthProvider')
  return ctx
}