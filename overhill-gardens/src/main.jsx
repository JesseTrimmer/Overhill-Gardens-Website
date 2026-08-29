import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { StaffAuthProvider } from './context/StaffAuthContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <StaffAuthProvider>
        <App />
      </StaffAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)