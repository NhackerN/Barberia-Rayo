import { CalendarCheck, Check, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BOOKING_FORM_PATH, EXPERIENCE_POINTS } from '../constants'

export function Experience() {
  return (
    <section id="experiencia" className="bg-rayo-black py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="animate-fade-in">
          <span className="section-kicker">Experiencia</span>
          <h2 className="display-title mt-4">PRECISIÓN QUE SE NOTA</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-rayo-muted">
            Barbería Rayo está pensada para quienes buscan un corte con
            estructura, detalle y presencia. Aquí cada línea tiene intención y
            cada acabado se revisa antes de salir.
          </p>
          <Link
            to={BOOKING_FORM_PATH}
            className="outline-button mt-8 px-6 py-4"
          >
            <CalendarCheck className="h-5 w-5" />
            Agendar cita
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 border border-rayo-purple/25 shadow-[0_0_34px_rgba(124,58,237,0.12)]" />
          <div className="relative overflow-hidden border border-rayo-purple/25 bg-rayo-panel p-6 shadow-[0_0_30px_rgba(124,58,237,0.14)] sm:p-8">
            <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-rayo-purple/20 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-rayo-yellow/10 blur-3xl" />
            <div className="relative flex items-center gap-3 border-b border-rayo-purple/25 pb-6">
              <span className="grid h-14 w-14 place-items-center bg-rayo-yellow text-black shadow-[0_0_26px_rgba(124,58,237,0.24)]">
                <Zap className="h-8 w-8 fill-current" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase text-rayo-yellow">
                  Método Rayo
                </p>
                <p className="text-rayo-muted">Detalle, ritmo y ejecución</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              {EXPERIENCE_POINTS.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-4 border border-rayo-purple/20 bg-black/40 p-4 transition-all duration-300 hover:border-rayo-purple/70 hover:bg-rayo-purple/10 hover:shadow-[0_0_24px_rgba(124,58,237,0.16)]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center bg-rayo-yellow text-black shadow-[0_0_18px_rgba(124,58,237,0.22)]">
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </span>
                  <span className="font-semibold text-white">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-rayo-purple/20 bg-black/40 p-5 transition-all duration-300 hover:border-rayo-purple/70 hover:shadow-[0_0_24px_rgba(124,58,237,0.16)]">
                <ShieldCheck className="h-7 w-7 text-rayo-yellow" />
                <p className="mt-4 font-display text-3xl text-white">
                  Limpio y profesional
                </p>
              </div>
              <div className="border border-rayo-purple/20 bg-black/40 p-5 transition-all duration-300 hover:border-rayo-purple/70 hover:shadow-[0_0_24px_rgba(124,58,237,0.16)]">
                <Sparkles className="h-7 w-7 text-rayo-yellow" />
                <p className="mt-4 font-display text-3xl text-white">
                  Actitud premium
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
