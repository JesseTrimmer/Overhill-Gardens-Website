import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Contact from './pages/Contact'

import NurseryLayout from './pages/nursery/NurseryLayout'
import BrowsePlants from './pages/nursery/BrowsePlants'
import HowToPurchase from './pages/nursery/HowToPurchase'
import AllAboutNatives from './pages/nursery/AllAboutNatives'
import TourNursery from './pages/nursery/TourNursery'
import CalendarEvents from './pages/nursery/CalendarEvents'
import GardenerResources from './pages/nursery/GardenerResources'

import LandscapingLayout from './pages/landscaping/LandscapingLayout'
import DesignApproach from './pages/landscaping/DesignApproach'
import LandscapeGallery from './pages/landscaping/LandscapeGallery'
import HardscapeGallery from './pages/landscaping/HardscapeGallery'
import CommercialPortfolio from './pages/landscaping/CommercialPortfolio'
import RestorationEcology from './pages/landscaping/RestorationEcology'
import StartProject from './pages/landscaping/StartProject'
import ThankYou from './pages/ThankYou'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/nursery" element={<NurseryLayout />}>
            <Route index element={<Navigate to="browse-plants" replace />} />
            <Route path="browse-plants" element={<BrowsePlants />} />
            <Route path="how-to-purchase" element={<HowToPurchase />} />
            <Route path="all-about-natives" element={<AllAboutNatives />} />
            <Route path="tour" element={<TourNursery />} />
            <Route path="calendar" element={<CalendarEvents />} />
            <Route path="resources" element={<GardenerResources />} />
          </Route>

          <Route path="/landscaping" element={<LandscapingLayout />}>
            <Route index element={<Navigate to="design-approach" replace />} />
            <Route path="design-approach" element={<DesignApproach />} />
            <Route path="gallery" element={<LandscapeGallery />} />
            <Route path="hardscape" element={<HardscapeGallery />} />
            <Route path="commercial" element={<CommercialPortfolio />} />
            <Route path="restoration-ecology" element={<RestorationEcology />} />
            <Route path="start-project" element={<StartProject />} />
          </Route>

          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}