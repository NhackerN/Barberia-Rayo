import { Clock, MapPin, Navigation, Send } from 'lucide-react'
import { HOURS, MAPS_URL, WHATSAPP_URL } from '../constants'

export function Location() {
  return (
    <section id="ubicacion" className="bg-rayo-black py-24 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
          <div>
            <span className="section-kicker">Ubicación</span>
            <h2 className="display-title mt-4">ESTAMOS EN CHIMALHUACÁN</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-rayo-muted">
              Agenda tu visita y llega directo. La ubicación exacta puede
              actualizarse desde la constante MAPS_URL.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="premium-button justify-center px-6 py-4"
              >
                <Navigation className="h-5 w-5" />
                Abrir Google Maps
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="outline-button justify-center px-6 py-4"
              >
                <Send className="h-5 w-5" />
                Mandar mensaje
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="map-panel relative min-h-80 overflow-hidden border border-white/10 bg-rayo-panel p-6">
              <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:38px_38px]" />
              <div className="absolute left-10 top-16 h-48 w-56 rotate-12 border-l-4 border-t-4 border-rayo-yellow" />
              <div className="absolute bottom-12 right-12 h-36 w-44 -rotate-12 border-b-4 border-r-4 border-rayo-yellow/80" />
              <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center bg-rayo-yellow text-black shadow-[0_0_40px_rgba(255,210,31,0.45)]">
                <MapPin className="h-8 w-8 fill-current" />
              </div>
              <div className="relative z-10 flex h-full flex-col justify-between">
                <p className="font-display text-4xl text-white">
                  CHIMALHUACÁN
                </p>
                <p className="max-w-xs text-sm leading-6 text-rayo-muted">
                  Mapa editable con acceso directo a Google Maps para llegar
                  sin vueltas.
                </p>
              </div>
            </div>

            <div className="border border-white/10 bg-rayo-panel p-6">
              <Clock className="h-9 w-9 text-rayo-yellow" />
              <h3 className="mt-6 font-display text-4xl text-white">
                HORARIO
              </h3>
              <div className="mt-6 grid gap-4">
                {HOURS.map((item) => (
                  <div
                    key={item.day}
                    className="border border-white/10 bg-black/40 p-4"
                  >
                    <p className="font-bold text-white">{item.day}</p>
                    <p className="mt-1 text-sm text-rayo-muted">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          id="contacto"
          className="relative mt-20 overflow-hidden border border-rayo-yellow/35 bg-[#0b0b0b] p-8 sm:p-12 lg:p-14"
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_50%,rgba(255,210,31,0.2),transparent_45%)]" />
          <div className="absolute -right-8 top-8 h-52 w-20 rotate-12 bg-rayo-yellow/90" />
          <div className="relative z-10 max-w-4xl">
            <h2 className="font-display text-6xl leading-none text-white sm:text-7xl lg:text-8xl">
              TU PRÓXIMO CORTE EMPIEZA AQUÍ
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-rayo-muted">
              Manda mensaje, aparta tu lugar y llega listo para un corte con
              precisión y actitud.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="premium-button justify-center px-8 py-5 text-base"
              >
                Agendar por WhatsApp
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="outline-button justify-center px-8 py-5 text-base"
              >
                Ver ubicación
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
