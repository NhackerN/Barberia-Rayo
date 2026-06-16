import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'
import BookingPage from './pages/BookingPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen overflow-x-hidden bg-rayo-black text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/agendar" element={<BookingPage />} />
          </Routes>
        </main>
        <Footer />
        <Analytics />
      </div>
    </Router>
  )
}

export default App
