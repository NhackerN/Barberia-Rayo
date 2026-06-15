import { Experience } from '../components/Experience'
import { Gallery } from '../components/Gallery'
import { Hero } from '../components/Hero'
import { Location } from '../components/Location'
import { Services } from '../components/Services'

export default function HomePage() {
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
