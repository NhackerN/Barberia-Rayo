import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Experience } from '../components/Experience'
import { Gallery } from '../components/Gallery'
import { Hero } from '../components/Hero'
import { Location } from '../components/Location'
import { Services } from '../components/Services'

export default function HomePage() {
  const location = useLocation()

  useEffect(() => {
    const targetId = location.hash ? location.hash.slice(1) : 'inicio'
    const target = document.getElementById(targetId)

    if (!target) {
      return
    }

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.hash])

  return (
    <>
      <Hero />
      <Services />
      <Experience />
      <Gallery />
      <Location />
    </>
  )
}
