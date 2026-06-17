import { ArrowUpRight } from 'lucide-react'
import { GALLERY_ITEMS } from '../constants'

export function Gallery() {
  return (
    <section id="galeria" className="section-band">
      <div className="section-shell">
        <div className="section-heading animate-fade-in">
          <span className="section-kicker">Galería</span>
          <h2 className="display-title">CORTES, DETALLES Y ESTILO RAYO</h2>
        </div>

        <div className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {GALLERY_ITEMS.map((item, index) => (
            <article
              key={item}
              className={`gallery-tile group relative overflow-hidden border border-rayo-purple/20 bg-rayo-panel shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition-all duration-300 hover:border-rayo-purple/70 hover:shadow-[0_0_30px_rgba(124,58,237,0.20)] ${
                index === 1 || index === 4 ? 'md:row-span-2' : ''
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,58,237,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.09),rgba(91,33,182,0.08))] transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/75 to-transparent" />
              <div className="absolute right-0 top-0 h-14 w-14 translate-x-7 -translate-y-7 rotate-45 bg-[linear-gradient(135deg,#FACC15,#7C3AED)] transition-all duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
              <div className="absolute inset-0 bg-rayo-purple/0 transition-colors duration-300 group-hover:bg-rayo-purple/70" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="text-sm font-bold text-rayo-yellow transition-colors duration-300 group-hover:text-rayo-yellow">
                    Foto {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1 font-display text-3xl text-white transition-colors duration-300 group-hover:text-white">
                    {item}
                  </h3>
                </div>
                <span className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-colors duration-300 group-hover:border-rayo-yellow group-hover:text-rayo-yellow">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="border border-rayo-yellow bg-black/40 px-5 py-3 font-bold text-white backdrop-blur-sm">
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
