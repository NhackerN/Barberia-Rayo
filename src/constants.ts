export const WHATSAPP_URL =
  'https://wa.me/525512345678?text=Hola%20Barber%C3%ADa%20Rayo%2C%20quiero%20agendar%20mi%20corte'

export const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Barber%C3%ADa%20Rayo%20Chimalhuac%C3%A1n'

export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
] as const

export const HERO_STATS = [
  { value: '+5', label: 'Servicios' },
  { value: '7', label: 'días abierto' },
  { value: '100%', label: 'profesional' },
] as const

export type ServiceIcon =
  | 'scissors'
  | 'fade'
  | 'modern'
  | 'beard'
  | 'razor'
  | 'combo'

export const SERVICES = [
  {
    icon: 'scissors',
    title: 'Corte clásico',
    description: 'Líneas limpias, forma pulida y acabado exacto para todos los días.',
    price: '$130',
  },
  {
    icon: 'fade',
    title: 'Fade / Degradado',
    description: 'Transiciones suaves, contornos definidos y proporción a tu estilo.',
    price: '$130',
  },
  {
    icon: 'modern',
    title: 'Corte moderno',
    description: 'Textura, volumen y estructura con una lectura actual de tu imagen.',
    price: '$130',
  },
  {
    icon: 'beard',
    title: 'Perfilado de barba',
    description: 'Contorno nítido, simetría y detalle para una barba con presencia.',
    price: '$130',
  },
  {
    icon: 'razor',
    title: 'Afeitado',
    description: 'Ritual preciso con acabado limpio y sensación fresca.',
    price: '$130',
  },
  {
    icon: 'combo',
    title: 'Corte + Barba',
    description: 'Servicio completo para salir con corte, barba y actitud alineados.',
    price: '$130',
  },
] as const

export const EXPERIENCE_POINTS = [
  'Precisión en cada detalle',
  'Atención personalizada',
  'Estilo moderno',
  'Ambiente urbano premium',
  'Agenda rápida por WhatsApp',
] as const

export const GALLERY_ITEMS = [
  'Fade limpio',
  'Corte moderno',
  'Barba perfilada',
  'Textura urbana',
  'Afeitado preciso',
  'Corte + barba',
] as const

export const HOURS = [
  { day: 'Lunes a domingo', time: '10:00 AM - 9:00 PM' },
  { day: 'Horarios editables', time: 'Agenda por WhatsApp' },
] as const
