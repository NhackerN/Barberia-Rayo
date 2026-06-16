import { CalendarCheck, Check, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { BOOKING_FORM_PATH, EXPERIENCE_POINTS } from '../constants'

export function Experience() {
  return (
    <section id="experiencia" className="bg-rayo-black py-24 sm:py-32">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
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
          <div className="absolute -inset-4 border border-rayo-yellow/20" />
          <div className="relative overflow-hidden border border-white/10 bg-rayo-panel p-6 sm:p-8">
            <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-rayo-yellow/10 blur-3xl" />
            <div className="flex items-center gap-3 border-b border-white/10 pb-6">
              <span className="grid h-14 w-14 place-items-center bg-rayo-yellow text-black">
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
                  className="flex items-center gap-4 border border-white/10 bg-black/35 p-4 transition-colors duration-300 hover:border-rayo-yellow/60"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center bg-rayo-yellow text-black">
                    <Check className="h-5 w-5" strokeWidth={3} />
                  </span>
                  <span className="font-semibold text-white">{point}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-white/10 bg-black/45 p-5">
                <ShieldCheck className="h-7 w-7 text-rayo-yellow" />
                <p className="mt-4 font-display text-3xl text-white">
                  Limpio y profesional
                </p>
              </div>
              <div className="border border-white/10 bg-black/45 p-5">
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
