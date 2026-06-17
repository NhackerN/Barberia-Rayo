import {
  BadgeCheck,
  Brush,
  Flame,
  Gem,
  Scissors,
  Star,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SERVICES } from '../constants'
import type { ServiceIcon } from '../constants'

const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  scissors: Scissors,
  fade: Flame,
  modern: Gem,
  beard: Brush,
  razor: Star,
  combo: BadgeCheck,
}

export function Services() {
  return (
    <section id="servicios" className="section-band">
      <div className="section-shell">
        <div className="section-heading animate-fade-in">
          <span className="section-kicker">Servicios</span>
          <h2 className="display-title">CORTE, BARBA Y DETALLE</h2>
          <p>
            Servicios directos, bien ejecutados y con acabado profesional para
            mantener tu estilo siempre afilado.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = serviceIcons[service.icon]

            return (
              <article
                key={service.title}
                className="group relative overflow-hidden border border-rayo-purple/20 bg-rayo-panel p-6 shadow-[0_18px_45px_rgba(0,0,0,0.26)] transition-all duration-300 hover:-translate-y-1 hover:border-rayo-purple/70 hover:bg-rayo-panelSoft hover:shadow-[0_0_30px_rgba(124,58,237,0.20)]"
              >
                <div className="absolute right-0 top-0 h-16 w-16 translate-x-8 -translate-y-8 rotate-45 bg-[linear-gradient(135deg,#FACC15,#7C3AED)] transition-transform duration-300 group-hover:translate-x-6 group-hover:-translate-y-6" />
                <div className="flex h-14 w-14 items-center justify-center border border-rayo-purple/40 bg-rayo-purple/10 text-rayo-yellow shadow-[0_0_22px_rgba(124,58,237,0.16)] transition-all duration-300 group-hover:border-rayo-yellow/60 group-hover:bg-rayo-yellow/10">
                  <Icon className="h-7 w-7" strokeWidth={2.2} />
                </div>
                <h3 className="mt-7 font-display text-4xl text-white">
                  {service.title}
                </h3>
                <p className="mt-4 min-h-20 text-sm leading-7 text-rayo-muted">
                  {service.description}
                </p>
                <div className="mt-6 inline-flex border border-rayo-purple/25 bg-black px-4 py-2 text-sm font-bold text-rayo-yellow shadow-[0_0_18px_rgba(124,58,237,0.12)]">
                  {service.price}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
