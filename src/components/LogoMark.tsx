import logoImage from '../assets/barberia-rayo-logo.png'

type LogoMarkProps = {
  className?: string
  imageClassName?: string
}

export function LogoMark({ className = '', imageClassName = '' }: LogoMarkProps) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden border border-rayo-purple/40 bg-black shadow-[0_0_28px_rgba(124,58,237,0.18)] ${className}`}
    >
      <img
        src={logoImage}
        alt="Logo Barbería Rayo"
        className={`h-full w-full object-contain drop-shadow-[0_0_8px_rgba(250,204,21,0.45)] ${imageClassName}`}
      />
    </span>
  )
}
