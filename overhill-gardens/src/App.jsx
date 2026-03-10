import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NurseryShell from './pages/nursery/NurseryShell'
import LandscapingShell from './pages/landscaping/LandscapingShell'
import Contact from './pages/Contact'

export default function App() {
  const [activePage, setActivePage] = useState('home')

  const handleNav = (page) => {
    setActivePage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderPage = () => {
    switch (activePage) {
      case 'home':        return <Home setActivePage={handleNav} />
      case 'nursery':     return <NurseryShell />
      case 'landscaping': return <LandscapingShell />
      case 'contact':     return <Contact />
      default:            return <Home setActivePage={handleNav} />
    }
  }

  return (
    <>
      <Navbar activePage={activePage} setActivePage={handleNav} />
      <main key={activePage}>
        {renderPage()}
      </main>
      <Footer setActivePage={handleNav} />
    </>
  )
}