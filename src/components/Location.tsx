import { Clock, Navigation, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  BOOKING_FORM_PATH,
  HOURS,
  MAPS_EMBED_URL,
  MAPS_URL,
  WHATSAPP_URL,
} from '../constants'

export function Location() {
  return (
    <section id="ubicacion" className="bg-rayo-black py-24 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
          <div className="animate-fade-in">
            <span className="section-kicker">Ubicación</span>
            <h2 className="display-title mt-4">ESTAMOS EN CHIMALHUACÁN</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-rayo-muted">
              Agenda tu visita y usa el mapa interactivo para llegar directo.
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
            <div className="relative min-h-80 overflow-hidden border border-rayo-purple/25 bg-rayo-panel shadow-[0_0_30px_rgba(124,58,237,0.12)]">
              <iframe
                title="Mapa interactivo de Barbería Rayo en Chimalhuacán"
                src={MAPS_EMBED_URL}
                className="absolute inset-0 h-full w-full bg-white grayscale brightness-[0.78] contrast-[1.12]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 border border-rayo-purple/30 shadow-[inset_0_0_80px_rgba(0,0,0,0.42),inset_0_0_55px_rgba(124,58,237,0.12)]" />
              <div className="pointer-events-none absolute left-4 top-4 border border-rayo-purple/25 bg-black/80 px-4 py-3 shadow-[0_0_24px_rgba(124,58,237,0.16)] backdrop-blur-sm">
                <p className="font-display text-3xl text-white">
                  CHIMALHUACÁN
                </p>
                <p className="text-xs font-bold uppercase text-rayo-yellow">
                  Google Maps
                </p>
              </div>
            </div>

            <div className="border border-rayo-purple/25 bg-rayo-panel p-6 shadow-[0_0_30px_rgba(124,58,237,0.12)]">
              <Clock className="h-9 w-9 text-rayo-yellow" />
              <h3 className="mt-6 font-display text-4xl text-white">
                HORARIO
              </h3>
              <div className="mt-6 grid gap-4">
                {HOURS.map((item) => (
                  <div
                    key={item.day}
                    className="border border-rayo-purple/20 bg-black/40 p-4 transition-all duration-300 hover:border-rayo-purple/70 hover:shadow-[0_0_22px_rgba(124,58,237,0.15)]"
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
          className="relative mt-20 overflow-hidden border border-rayo-purple/40 bg-rayo-surface p-8 shadow-[0_0_30px_rgba(124,58,237,0.20)] sm:p-12 lg:p-14"
        >
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(ellipse_at_70%_50%,rgba(124,58,237,0.28),transparent_48%),linear-gradient(135deg,transparent,rgba(250,204,21,0.08))]" />
          <div className="absolute -right-8 top-8 h-52 w-20 rotate-12 bg-[linear-gradient(180deg,#FACC15,#7C3AED)] opacity-90 shadow-[0_0_38px_rgba(124,58,237,0.32)]" />
          <div className="relative z-10 max-w-4xl">
            <h2 className="font-display text-6xl leading-none text-white sm:text-7xl lg:text-8xl">
              TU PRÓXIMO CORTE EMPIEZA AQUÍ
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-rayo-muted">
              Manda mensaje, aparta tu lugar y llega listo para un corte con
              precisión y actitud.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                to={BOOKING_FORM_PATH}
                className="premium-button justify-center px-8 py-5 text-base"
              >
                Agendar cita
              </Link>
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
