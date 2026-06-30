import { useState } from 'react'
import { Zap } from 'lucide-react'
import { WHATSAPP_URL } from '../constants'
import SelectInput from './SelectInput'

interface FormData {
  fullName: string
  phone: string
  email: string
  service: string
  barber: string
  date: string
  time: string
  description: string
  comments: string
  acceptTerms: boolean
  wantContact: boolean
  contactMethod: 'whatsapp' | 'email' | 'both' | ''
}

interface FormErrors {
  [key: string]: string
}

type BookingPayload = FormData & {
  bookingId: string
}

const SERVICES = [
  'Corte clásico',
  'Corte moderno',
  'Fade',
  'Corte + Barba',
  'Perfilado de barba',
  'Diseño personalizado',
  'Otro',
]

const BARBERS = [
  'Sin preferencia',
  'Rayo',
  'Angel',
]

interface BookingFormProps {
  onSubmit: () => void
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    service: '',
    barber: 'Sin preferencia',
    date: '',
    time: '',
    description: '',
    comments: '',
    acceptTerms: false,
    wantContact: false,
    contactMethod: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre es requerido'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido'
    } else if (!/^[0-9\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = 'Ingresa un teléfono válido'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido'
    }

    if (!formData.service) {
      newErrors.service = 'Selecciona un servicio'
    }

    if (!formData.date) {
      newErrors.date = 'Selecciona una fecha'
    }

    if (!formData.time) {
      newErrors.time = 'Selecciona una hora'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar ser contactado'
    }

    if (formData.wantContact && !formData.contactMethod) {
      newErrors.contactMethod = 'Selecciona un método de contacto'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))

    if (errors[name] || errors.submit) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
        submit: '',
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const bookingPayload: BookingPayload = {
      ...formData,
      bookingId: createBookingId(),
    }

    window.open(
      buildBookingWhatsAppUrl(bookingPayload),
      '_blank',
      'noopener,noreferrer'
    )

    setIsSubmitting(true)

    try {
      await sendWeb3FormsNotification(bookingPayload)
      await syncGoogleCalendar(bookingPayload).catch((error) => {
        console.warn('Google Calendar sync failed:', error)
      })
      onSubmit()
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit:
          error instanceof Error
            ? error.message
            : 'No pudimos agendar la cita. Inténtalo de nuevo.',
      }))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-2xl relative z-auto pointer-events-auto"
      style={{ touchAction: 'manipulation' }}
    >
      <div className="grid gap-8">
        {/* Información Personal */}
        <fieldset className="space-y-4">
          <legend className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-rayo-yellow" />
            <span className="font-display text-2xl text-white">
              Información personal
            </span>
          </legend>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-white">
                Nombre completo <span className="text-rayo-yellow">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Tu nombre"
                autoComplete="name"
                className={`w-full px-4 py-3 bg-rayo-panel border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rayo-yellow focus:shadow-[0_0_20px_rgba(250,204,21,0.18)] text-white placeholder-white/40 ${
                  errors.fullName ? 'border-red-500/50 focus:ring-red-500' : 'border-rayo-purple/30 hover:border-rayo-purple/60 focus:border-rayo-yellow/80'
                }`}
                style={{ touchAction: 'manipulation', minHeight: '48px', fontSize: '16px' }}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-semibold text-white">
                Teléfono / WhatsApp <span className="text-rayo-yellow">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+55 1234 5678"
                autoComplete="tel"
                className={`w-full px-4 py-3 bg-rayo-panel border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rayo-yellow focus:shadow-[0_0_20px_rgba(250,204,21,0.18)] text-white placeholder-white/40 ${
                  errors.phone ? 'border-red-500/50 focus:ring-red-500' : 'border-rayo-purple/30 hover:border-rayo-purple/60 focus:border-rayo-yellow/80'
                }`}
                style={{ touchAction: 'manipulation', minHeight: '48px', fontSize: '16px' }}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-white">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              autoComplete="email"
              className={`w-full px-4 py-3 bg-rayo-panel border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rayo-yellow focus:shadow-[0_0_20px_rgba(250,204,21,0.18)] text-white placeholder-white/40 ${
                errors.email ? 'border-red-500/50 focus:ring-red-500' : 'border-rayo-purple/30 hover:border-rayo-purple/60 focus:border-rayo-yellow/80'
              }`}
              style={{ touchAction: 'manipulation', minHeight: '48px', fontSize: '16px' }}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
        </fieldset>

        {/* Servicio */}
        <fieldset className="space-y-4">
          <legend className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-rayo-yellow" />
            <span className="font-display text-2xl text-white">
              Servicio
            </span>
          </legend>

          <div className="space-y-2">
            <label htmlFor="service" className="block text-sm font-semibold text-white">
              ¿Qué servicio deseas? <span className="text-rayo-yellow">*</span>
            </label>
            <SelectInput
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              options={SERVICES}
              placeholder="Selecciona un servicio"
              hasError={!!errors.service}
              firstOptionEmpty
            />
            {errors.service && (
              <p className="text-sm text-red-500">{errors.service}</p>
            )}
          </div>
        </fieldset>

        {/* Preferencias */}
        <fieldset className="space-y-4">
          <legend className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-rayo-yellow" />
            <span className="font-display text-2xl text-white">
              Preferencias
            </span>
          </legend>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="barber" className="block text-sm font-semibold text-white">
                Barbero preferido
              </label>
              <SelectInput
                id="barber"
                name="barber"
                value={formData.barber}
                onChange={handleChange}
                options={BARBERS}
                placeholder="Sin preferencia"
                firstOptionEmpty={false}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-semibold text-white">
                Fecha deseada <span className="text-rayo-yellow">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-rayo-panel border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rayo-yellow focus:shadow-[0_0_20px_rgba(250,204,21,0.18)] text-white ${
                  errors.date ? 'border-red-500/50 focus:ring-red-500' : 'border-rayo-purple/30 hover:border-rayo-purple/60 focus:border-rayo-yellow/80'
                }`}
                style={{ touchAction: 'manipulation', minHeight: '48px', fontSize: '16px' }}
              />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-semibold text-white">
                Hora deseada <span className="text-rayo-yellow">*</span>
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-rayo-panel border rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rayo-yellow focus:shadow-[0_0_20px_rgba(250,204,21,0.18)] text-white ${
                  errors.time ? 'border-red-500/50 focus:ring-red-500' : 'border-rayo-purple/30 hover:border-rayo-purple/60 focus:border-rayo-yellow/80'
                }`}
                style={{ touchAction: 'manipulation', minHeight: '48px', fontSize: '16px' }}
              />
              {errors.time && (
                <p className="text-sm text-red-500">{errors.time}</p>
              )}
            </div>
          </div>
        </fieldset>

        {/* Detalles */}
        <fieldset className="space-y-4">
          <legend className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-rayo-yellow" />
            <span className="font-display text-2xl text-white">
              Detalles
            </span>
          </legend>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-semibold text-white">
              ¿Cómo te gustaría tu corte?
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describa el estilo, largo, detalles que desea..."
              rows={3}
              className="w-full px-4 py-3 bg-rayo-panel border border-rayo-purple/30 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rayo-yellow focus:border-rayo-yellow/80 focus:shadow-[0_0_20px_rgba(250,204,21,0.18)] text-white placeholder-white/40 hover:border-rayo-purple/60 resize-none"
              style={{ touchAction: 'manipulation', minHeight: '120px', fontSize: '16px' }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="comments" className="block text-sm font-semibold text-white">
              Referencias o comentarios adicionales
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Comparte referencias, fotos o cualquier comentario adicional..."
              rows={3}
              className="w-full px-4 py-3 bg-rayo-panel border border-rayo-purple/30 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rayo-yellow focus:border-rayo-yellow/80 focus:shadow-[0_0_20px_rgba(250,204,21,0.18)] text-white placeholder-white/40 hover:border-rayo-purple/60 resize-none"
              style={{ touchAction: 'manipulation', minHeight: '120px', fontSize: '16px' }}
            />
          </div>
        </fieldset>

        {/* Contacto Preferido */}
        <fieldset className="space-y-4">
          <legend className="flex items-center gap-2 mb-6">
            <Zap className="h-5 w-5 text-rayo-yellow" />
            <span className="font-display text-2xl text-white">
              Contacto preferido
            </span>
          </legend>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="wantContact"
              name="wantContact"
              checked={formData.wantContact}
              onChange={handleChange}
              className="w-5 h-5 mt-1 accent-rayo-yellow cursor-pointer border border-rayo-purple/40 rounded"
              style={{ touchAction: 'manipulation' }}
            />
            <label htmlFor="wantContact" className="text-sm text-white">
              <span className="font-semibold">¿Deseas que nos pongamos en contacto?</span>
            </label>
          </div>

          {formData.wantContact && (
            <div className="space-y-4 pl-8 border-l-2 border-rayo-purple/40">
              <p className="text-sm text-rayo-muted">
                Selecciona cómo prefieres que te contactemos <span className="text-rayo-yellow">*</span>
              </p>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-rayo-purple/25 rounded hover:border-rayo-purple/70 hover:bg-rayo-purple/10 transition-all duration-300 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="whatsapp"
                    checked={formData.contactMethod === 'whatsapp'}
                    onChange={handleChange}
                    className="w-4 h-4 accent-rayo-yellow cursor-pointer"
                    style={{ touchAction: 'manipulation' }}
                  />
                  <span className="text-sm text-white font-semibold">WhatsApp</span>
                </label>

                <label className="flex items-center gap-3 p-3 border border-rayo-purple/25 rounded hover:border-rayo-purple/70 hover:bg-rayo-purple/10 transition-all duration-300 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={formData.contactMethod === 'email'}
                    onChange={handleChange}
                    className="w-4 h-4 accent-rayo-yellow cursor-pointer"
                    style={{ touchAction: 'manipulation' }}
                  />
                  <span className="text-sm text-white font-semibold">Correo electrónico</span>
                </label>

                <label className="flex items-center gap-3 p-3 border border-rayo-purple/25 rounded hover:border-rayo-purple/70 hover:bg-rayo-purple/10 transition-all duration-300 cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="both"
                    checked={formData.contactMethod === 'both'}
                    onChange={handleChange}
                    className="w-4 h-4 accent-rayo-yellow cursor-pointer"
                    style={{ touchAction: 'manipulation' }}
                  />
                  <span className="text-sm text-white font-semibold">Ambos</span>
                </label>
              </div>

              {errors.contactMethod && (
                <p className="text-sm text-red-500">{errors.contactMethod}</p>
              )}
            </div>
          )}
        </fieldset>

        {/* Confirmación */}
        <fieldset className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="acceptTerms"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="w-5 h-5 mt-1 accent-rayo-yellow cursor-pointer border border-rayo-purple/40 rounded"
              style={{ touchAction: 'manipulation' }}
            />
            <label htmlFor="acceptTerms" className="text-sm text-white">
              <span className="font-semibold">Acepto ser contactado</span>
              <span className="text-rayo-muted"> para confirmar mi cita </span>
              <span className="text-rayo-yellow">*</span>
            </label>
          </div>
          {errors.acceptTerms && (
            <p className="text-sm text-red-500 ml-8">{errors.acceptTerms}</p>
          )}
        </fieldset>

        {/* Submit Button */}
        {errors.submit && (
          <p className="text-sm text-red-500">{errors.submit}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="premium-button w-full justify-center px-8 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ touchAction: 'manipulation', minHeight: '48px', fontSize: '16px' }}
        >
          {isSubmitting ? 'Enviando...' : 'Agendar cita'}
        </button>
      </div>
    </form>
  )
}

function createBookingId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function buildBookingWhatsAppUrl(bookingPayload: BookingPayload) {
  const [baseUrl] = WHATSAPP_URL.split('?')

  return `${baseUrl}?text=${encodeURIComponent(buildWhatsAppMessage(bookingPayload))}`
}

function buildWhatsAppMessage(bookingPayload: BookingPayload) {
  return [
    'Hola Barbería Rayo, quiero confirmar mi cita.',
    '',
    `Nombre: ${bookingPayload.fullName}`,
    `Telefono / WhatsApp: ${bookingPayload.phone}`,
    bookingPayload.email ? `Correo: ${bookingPayload.email}` : null,
    `Servicio: ${bookingPayload.service}`,
    `Barbero: ${bookingPayload.barber}`,
    `Fecha: ${bookingPayload.date}`,
    `Hora: ${bookingPayload.time}`,
    bookingPayload.description
      ? `Como me gustaria mi corte: ${bookingPayload.description}`
      : null,
    bookingPayload.comments
      ? `Comentarios adicionales: ${bookingPayload.comments}`
      : null,
    '',
    'Quedo pendiente de confirmacion.',
  ]
    .filter(Boolean)
    .join('\n')
}

async function sendWeb3FormsNotification(bookingPayload: BookingPayload) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined

  if (!accessKey) {
    throw new Error('Falta configurar Web3Forms para recibir la cita.')
  }

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Nueva cita Barbería Rayo - ${bookingPayload.service}`,
      from_name: 'Barbería Rayo',
      form_name: 'Barbería Rayo - Citas',
      name: bookingPayload.fullName,
      email: bookingPayload.email || 'sin-correo@barberia-rayo.local',
      phone: bookingPayload.phone,
      booking_id: bookingPayload.bookingId,
      servicio: bookingPayload.service,
      barbero: bookingPayload.barber,
      fecha: bookingPayload.date,
      hora: bookingPayload.time,
      contacto_preferido: bookingPayload.wantContact
        ? bookingPayload.contactMethod
        : 'No solicitado',
      descripcion: bookingPayload.description || 'Sin descripción',
      comentarios: bookingPayload.comments || 'Sin comentarios',
      message: buildWeb3FormsMessage(bookingPayload),
      botcheck: false,
    }),
  })
  const result = await response.json().catch(() => null)

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.message ||
        'No pudimos enviar tu cita por Web3Forms. Inténtalo de nuevo.'
    )
  }
}

async function syncGoogleCalendar(bookingPayload: BookingPayload) {
  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingPayload),
  })
  const result = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(result?.message || 'No pudimos crear el evento en Google Calendar.')
  }
}

function buildWeb3FormsMessage(bookingPayload: BookingPayload) {
  return [
    'Nueva cita registrada en Barbería Rayo.',
    '',
    `ID: ${bookingPayload.bookingId}`,
    `Cliente: ${bookingPayload.fullName}`,
    `Teléfono / WhatsApp: ${bookingPayload.phone}`,
    bookingPayload.email ? `Correo: ${bookingPayload.email}` : null,
    `Servicio: ${bookingPayload.service}`,
    `Barbero: ${bookingPayload.barber}`,
    `Fecha: ${bookingPayload.date}`,
    `Hora: ${bookingPayload.time}`,
    bookingPayload.description ? `Descripción: ${bookingPayload.description}` : null,
    bookingPayload.comments ? `Comentarios: ${bookingPayload.comments}` : null,
    bookingPayload.wantContact
      ? `Contacto preferido: ${bookingPayload.contactMethod}`
      : null,
  ]
    .filter(Boolean)
    .join('\n')
}
