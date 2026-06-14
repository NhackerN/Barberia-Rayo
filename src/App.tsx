import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { Hero } from './components/Hero'
import { Location } from './components/Location'
import { Navbar } from './components/Navbar'
import { Services } from './components/Services'

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-rayo-black text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Experience />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </div>
  )
}

export default App
