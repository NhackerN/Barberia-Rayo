import { useState } from 'react'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import BookingForm from '../components/BookingForm'

export default function BookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-rayo-black px-4 pb-16 pt-28 sm:pb-24 sm:pt-36">
        <div className="mx-auto w-full max-w-md text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-16 w-16 text-rayo-yellow" />
          </div>
          <h2 className="mb-4 font-display text-4xl text-white">
            ¡Solicitud enviada!
          </h2>
          <p className="mb-8 text-lg leading-7 text-rayo-muted">
            Tu solicitud fue enviada correctamente. Nos pondremos en contacto contigo para confirmar tu cita.
          </p>
          <Link
            to="/"
            className="premium-button w-full justify-center px-8 py-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-rayo-black px-4 pb-16 pt-28 sm:pb-24 sm:pt-36">
      <section className="mx-auto w-full max-w-3xl">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-rayo-yellow transition-colors hover:text-rayo-amber"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>

        <h1 className="mb-4 font-display text-5xl text-white sm:text-6xl">
          Agenda tu cita
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-rayo-muted">
          Completa tus datos y nos pondremos en contacto para confirmar tu horario.
        </p>

        <div className="relative z-auto mt-10 pointer-events-auto">
          <BookingForm onSubmit={handleSubmit} />
        </div>
      </section>
    </div>
  )
}
