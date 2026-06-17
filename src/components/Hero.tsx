import { ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/barberia-rayo-hero.png'
import { BOOKING_FORM_PATH, HERO_STATS } from '../constants'
import { LogoMark } from './LogoMark'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-rayo-black pt-28 sm:min-h-[92svh] sm:pt-36"
    >
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Barbero trabajando un corte fade en Barbería Rayo"
          className="hero-image absolute inset-y-0 right-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(124,58,237,0.20),rgba(0,0,0,0.75)),linear-gradient(90deg,#050505_0%,rgba(5,5,5,0.93)_30%,rgba(5,5,5,0.46)_67%,rgba(5,5,5,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_22%_28%,rgba(124,58,237,0.28),transparent_34%),radial-gradient(ellipse_at_80%_30%,rgba(250,204,21,0.14),transparent_28%),linear-gradient(90deg,rgba(124,58,237,0.16),transparent_18%,transparent_82%,rgba(124,58,237,0.18))]" />
        <div className="absolute inset-y-0 left-0 w-px bg-rayo-purple/70 shadow-[0_0_36px_rgba(124,58,237,0.75)]" />
        <div className="absolute inset-y-0 right-0 w-px bg-rayo-purple/40 shadow-[0_0_42px_rgba(124,58,237,0.55)]" />
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-rayo-black to-transparent" />
      </div>

      <div className="section-shell relative z-10 grid items-start pb-14 sm:min-h-[calc(92svh-7rem)] lg:items-center">
        <div className="absolute left-4 top-32 h-72 w-72 bg-rayo-purple/20 blur-[96px] sm:left-8 lg:left-12 lg:top-1/3" />
        <div className="relative w-full min-w-0 max-w-[22.5rem] animate-slide-up sm:max-w-6xl">
          <div className="inline-flex items-center gap-3 border border-rayo-purple/50 bg-black/40 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_26px_rgba(124,58,237,0.18)] backdrop-blur-md sm:text-base">
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

          <div className="mt-7 grid w-full max-w-2xl grid-cols-3 border-y border-rayo-purple/30 bg-black/40 shadow-[0_0_30px_rgba(124,58,237,0.14)] backdrop-blur-sm">
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`group px-3 py-5 transition-all duration-300 hover:bg-rayo-purple/10 hover:shadow-[inset_0_0_28px_rgba(124,58,237,0.18)] sm:px-4 ${
                  index !== 0 ? 'border-l border-rayo-purple/25' : ''
                }`}
              >
                <div className="font-display text-3xl text-rayo-yellow transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_18px_rgba(124,58,237,0.72)] sm:text-5xl">
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

      <LogoMark className="absolute bottom-28 right-10 z-10 hidden h-24 w-24 border-rayo-purple/40 bg-black/60 p-1 backdrop-blur-md xl:grid" />
      <div className="absolute bottom-7 right-6 hidden h-64 w-24 rotate-12 bg-[linear-gradient(180deg,#FACC15,#7C3AED)] mix-blend-screen opacity-85 shadow-[0_0_70px_rgba(124,58,237,0.42)] lg:block" />
    </section>
  )
}
