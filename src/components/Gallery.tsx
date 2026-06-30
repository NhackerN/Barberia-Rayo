import { useEffect, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import burstFadeImage from '../assets/BurstFade.jpeg'
import fadeDetailImage from '../assets/barberia-rayo-hero-real.jpg'
import midFadeSideImage from '../assets/MidFade1.jpg'
import midFadeBackImage from '../assets/MidFade2.jpg'
import { GALLERY_ITEMS } from '../constants'

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedItem = selectedIndex === null ? null : galleryItems[selectedIndex]

  useEffect(() => {
    if (selectedIndex === null) {
      return
    }

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedIndex])

  return (
    <section id="galeria" className="section-band">
      <div className="section-shell">
        <div className="section-heading animate-fade-in">
          <span className="section-kicker">Galería</span>
          <h2 className="display-title">CORTES, DETALLES Y ESTILO RAYO</h2>
        </div>

        <div className="mt-12 grid max-w-6xl auto-rows-[360px] gap-4 sm:auto-rows-[440px] lg:grid-cols-2">
          {galleryItems.map((item, index) => (
            <button
              type="button"
              key={item.title}
              onClick={() => setSelectedIndex(index)}
              aria-label={`Ver detalle de ${item.title}`}
              className="gallery-tile group relative cursor-pointer overflow-hidden border border-rayo-purple/20 bg-rayo-panel p-0 text-left shadow-[0_18px_45px_rgba(0,0,0,0.24)] transition-all duration-300 hover:border-rayo-purple/70 hover:shadow-[0_0_30px_rgba(124,58,237,0.20)]"
            >
              <div
                className={`absolute inset-0 grid ${
                  item.images.length > 1 ? 'grid-cols-2 gap-px bg-rayo-purple/25' : ''
                }`}
              >
                {item.images.map((image) => (
                  <img
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: image.position }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(124,58,237,0.16),transparent_30%),linear-gradient(135deg,rgba(0,0,0,0.06),rgba(91,33,182,0.12))]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/75 to-transparent" />
              <div className="absolute right-0 top-0 h-14 w-14 translate-x-7 -translate-y-7 rotate-45 bg-[linear-gradient(135deg,#FACC15,#7C3AED)] transition-all duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
              <div className="absolute inset-0 bg-rayo-purple/0 transition-colors duration-300 group-hover:bg-rayo-purple/70" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-left">
                <span>
                  <span className="block text-sm font-bold text-rayo-yellow transition-colors duration-300 group-hover:text-rayo-yellow">
                    Foto {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block font-display text-3xl text-white transition-colors duration-300 group-hover:text-white">
                    {item.title}
                  </span>
                </span>
                <span className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-colors duration-300 group-hover:border-rayo-yellow group-hover:text-rayo-yellow">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </div>
              <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="border border-rayo-yellow bg-black/40 px-5 py-3 font-bold text-white backdrop-blur-sm">
                  Ver detalle
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/[0.88] p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`Detalle de ${selectedItem.title}`}
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center border border-rayo-purple/40 bg-black/70 text-white transition-all duration-300 hover:border-rayo-yellow hover:text-rayo-yellow sm:right-8 sm:top-8"
            aria-label="Cerrar detalle"
            onClick={(event) => {
              event.stopPropagation()
              setSelectedIndex(null)
            }}
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative max-h-[86vh] w-full max-w-5xl overflow-hidden border border-rayo-purple/35 bg-rayo-surface shadow-[0_0_40px_rgba(124,58,237,0.24)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className={`grid ${
                selectedItem.images.length > 1 ? 'grid-cols-2 gap-px bg-rayo-purple/25' : ''
              }`}
            >
              {selectedItem.images.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.alt}
                  className={
                    selectedItem.images.length > 1
                      ? 'h-[82vh] w-full object-contain'
                      : 'max-h-[86vh] w-full object-contain'
                  }
                />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5 text-left sm:p-7">
              <p className="text-sm font-bold text-rayo-yellow">
                Foto {String(selectedIndex + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-1 font-display text-4xl text-white sm:text-5xl">
                {selectedItem.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

const galleryItems = [
  {
    title: GALLERY_ITEMS[0],
    images: [
      {
        src: fadeDetailImage,
        alt: 'Fade limpio con acabado peinado en Barbería Rayo',
        position: '50% 42%',
      },
    ],
  },
  {
    title: GALLERY_ITEMS[1],
    images: [
      {
        src: midFadeSideImage,
        alt: 'Midfade lateral con textura en Barbería Rayo',
        position: '58% 36%',
      },
      {
        src: midFadeBackImage,
        alt: 'Midfade visto desde atrás en Barbería Rayo',
        position: '50% 34%',
      },
    ],
  },
  {
    title: GALLERY_ITEMS[2],
    images: [
      {
        src: burstFadeImage,
        alt: 'Burst fade con acabado definido en Barbería Rayo',
        position: '50% 38%',
      },
    ],
  },
] as const
