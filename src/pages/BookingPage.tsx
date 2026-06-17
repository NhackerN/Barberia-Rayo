import { useEffect, useState } from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import BookingForm from '../components/BookingForm'

export default function BookingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (location.hash !== '#formulario' || isSubmitted) {
      return
    }

    window.requestAnimationFrame(() => {
      document
        .getElementById('formulario')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [isSubmitted, location.hash])

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  const handleBackHome = () => {
    navigate('/')
  }

  if (isSubmitted) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-24">
        <div className="max-w-md w-full border border-rayo-purple/25 bg-rayo-surface p-8 text-center shadow-[0_0_30px_rgba(124,58,237,0.16)]">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-20 w-20 text-rayo-yellow animate-pulse" />
          </div>
          <h2 className="font-display text-4xl text-white mb-4">
            ¡Solicitud enviada!
          </h2>
          <p className="text-rayo-muted mb-8 text-lg leading-7">
            Tu solicitud fue enviada correctamente. Nos pondremos en contacto contigo para confirmar tu cita.
          </p>
          <button
            onClick={handleBackHome}
            className="premium-button justify-center px-8 py-4 w-full"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-rayo-black">
      <section className="border-b border-rayo-purple/25 bg-rayo-surface py-16 shadow-[inset_0_-1px_0_rgba(124,58,237,0.12)] sm:py-20">
        <div className="section-shell">
          <button
            onClick={handleBackHome}
            className="inline-flex items-center gap-2 mb-6 text-rayo-yellow hover:text-rayo-purple transition-colors font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
          <h1 className="font-display text-5xl sm:text-6xl text-white mb-4">
            Agenda tu cita
          </h1>
          <p className="text-lg text-rayo-muted max-w-2xl">
            Cuéntanos qué servicio deseas y nos pondremos en contacto para confirmar tu horario.
          </p>
        </div>
      </section>

      <section id="formulario" className="py-16 sm:py-24">
        <div className="section-shell">
          <BookingForm onSubmit={handleSubmit} />
        </div>
      </section>
    </div>
  )
}
