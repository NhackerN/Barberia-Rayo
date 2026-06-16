import { ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/barberia-rayo-hero.png'
import { BOOKING_FORM_PATH, HERO_STATS } from '../constants'
import { LogoMark } from './LogoMark'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-rayo-black pt-28 sm:pt-36"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Barbero trabajando un corte fade en Barbería Rayo"
          className="hero-image absolute inset-y-0 right-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.92)_31%,rgba(5,5,5,0.42)_68%,rgba(5,5,5,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_22%,rgba(255,210,31,0.16),transparent_28%),radial-gradient(circle_at_82%_38%,rgba(255,210,31,0.15),transparent_23%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-rayo-black to-transparent" />
      </div>

      <div className="section-shell relative z-10 grid min-h-[calc(100vh-7rem)] items-start pb-14 lg:items-center">
        <div className="w-full min-w-0 max-w-[22.5rem] sm:max-w-6xl">
          <div className="inline-flex items-center gap-3 border border-rayo-yellow bg-black/40 px-4 py-2 text-sm font-semibold text-white shadow-rayo backdrop-blur-md sm:text-base">
            <Zap className="h-4 w-4 fill-rayo-yellow text-rayo-yellow" />
            Barbería Premium · Chimalhuacán
          </div>

          <h1 className="mt-7 max-w-full font-display text-[3.05rem] leading-[0.9] text-white sm:text-[5.6rem] sm:leading-[0.88] md:text-[6.8rem] lg:text-[7.8rem] xl:text-[8.4rem]">
            <span className="block">CORTES CON</span>
            <span className="block lg:whitespace-nowrap">
              <span className="inline-block text-rayo-yellow">ESTILO,</span>{' '}
              <span className="block sm:inline-block">PRECISIÓN</span>
            </span>
            <span className="block">
              Y ACTITUD
              <Zap
                className="ml-4 inline-block h-[0.62em] w-[0.62em] fill-rayo-yellow text-rayo-yellow"
                aria-label="rayo"
                strokeWidth={2.4}
              />
              <span className="sr-only"> ⚡</span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-rayo-muted sm:text-xl sm:leading-8">
            Barbería Rayo en Chimalhuacán: cortes, barba y afeitados con
            detalle profesional. Estilo callejero, ejecución impecable.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <Link
              to={BOOKING_FORM_PATH}
              className="premium-button justify-center px-7 py-4 text-base"
            >
              Agendar cita
            </Link>
            <a
              href="#servicios"
              className="outline-button justify-center px-7 py-4 text-base"
            >
              Ver servicios
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          <div className="mt-7 grid w-full max-w-2xl grid-cols-3 border-y border-white/12 bg-black/30 backdrop-blur-sm">
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`px-3 py-5 sm:px-4 ${
                  index !== 0 ? 'border-l border-white/12' : ''
                }`}
              >
                <div className="font-display text-3xl text-rayo-yellow sm:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-rayo-muted sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <LogoMark className="absolute bottom-28 right-10 z-10 hidden h-24 w-24 bg-black/60 p-1 backdrop-blur-md xl:grid" />
      <div className="absolute bottom-7 right-6 hidden h-64 w-24 rotate-12 bg-rayo-yellow/90 mix-blend-screen shadow-[0_0_70px_rgba(255,210,31,0.35)] lg:block" />
    </section>
  )
}
