import { ArrowUpRight } from 'lucide-react'
import { GALLERY_ITEMS } from '../constants'

export function Gallery() {
  return (
    <section id="galeria" className="section-band">
      <div className="section-shell">
        <div className="section-heading">
          <span className="section-kicker">Galería</span>
          <h2 className="display-title">CORTES, DETALLES Y ESTILO RAYO</h2>
          <p>
            Espacios listos para colocar fotos reales de cortes, barba y
            resultados dentro de la barbería.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <article
              key={item}
              className={`gallery-tile group relative overflow-hidden border border-white/10 bg-rayo-panel ${
                index === 1 || index === 4 ? 'md:row-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.14),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.01))]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/70 to-transparent" />
              <div className="absolute right-0 top-0 h-14 w-14 translate-x-7 -translate-y-7 rotate-45 bg-rayo-yellow transition-all duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
              <div className="absolute inset-0 bg-rayo-yellow/0 transition-colors duration-300 group-hover:bg-rayo-yellow/88" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-rayo-yellow transition-colors duration-300 group-hover:text-black">
                    Foto {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1 font-display text-3xl text-white transition-colors duration-300 group-hover:text-black">
                    {item}
                  </h3>
                </div>
                <span className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-colors duration-300 group-hover:border-black group-hover:text-black">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="border border-black px-5 py-3 font-bold text-black">
                  Ver detalle
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
