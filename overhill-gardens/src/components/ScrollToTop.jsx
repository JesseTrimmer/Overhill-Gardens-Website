import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    const isSubPage = pathname.startsWith('/nursery/') || pathname.startsWith('/landscaping/')
    window.scrollTo({ top: isSubPage ? 72 : 0, behavior: 'smooth' })
  }, [pathname])

  return null
}