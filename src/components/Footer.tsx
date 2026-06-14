import { Zap } from 'lucide-react'
import { NAV_LINKS, WHATSAPP_URL } from '../constants'

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-10">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <a href="#inicio" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center bg-rayo-yellow text-black">
              <Zap className="h-8 w-8 fill-current" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-3xl text-white">
                BARBERÍA RAYO
              </span>
              <span className="block pt-1 text-xs font-extrabold uppercase text-rayo-yellow">
                CHIMALHUACÁN
              </span>
            </span>
          </a>

          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-rayo-muted transition-colors hover:text-rayo-yellow"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-rayo-yellow"
            >
              Agendar
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-rayo-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Barbería Rayo. Derechos reservados.</p>
          <p>Diseñado con estilo para Barbería Rayo</p>
        </div>
      </div>
    </footer>
  )
}
