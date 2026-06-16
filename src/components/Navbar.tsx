import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BOOKING_FORM_PATH, NAV_LINKS } from '../constants'
import { LogoMark } from './LogoMark'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 py-3 sm:px-6">
      <nav className="pointer-events-auto relative mx-auto flex w-full max-w-7xl items-center justify-between border border-white/10 bg-black/55 px-3 py-3 pr-16 shadow-rayo backdrop-blur-xl sm:pl-5 sm:pr-16 lg:px-7">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="Barbería Rayo inicio"
          onClick={closeMenu}
        >
          <LogoMark className="h-10 w-10 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105 sm:h-12 sm:w-12" />
          <span className="leading-none">
            <span className="block font-display text-[1.45rem] text-white sm:text-3xl">
              BARBERÍA RAYO
            </span>
            <span className="block pt-1 text-xs font-extrabold uppercase text-rayo-yellow sm:text-sm">
              CHIMALHUACÁN
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={`/${link.href}`}
              className="group relative text-sm font-semibold text-white/82 transition-colors duration-300 hover:text-rayo-yellow"
            >
              {link.label}
              <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-rayo-yellow transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to={BOOKING_FORM_PATH}
            className="premium-button px-8 py-4 text-sm"
          >
            Agendar
          </Link>
        </div>

        <button
          type="button"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center border border-rayo-yellow bg-rayo-yellow text-black transition-colors hover:bg-rayo-amber lg:hidden"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`absolute left-4 right-4 top-full mx-auto mt-2 max-w-7xl border border-white/10 bg-black/90 p-4 shadow-rayo backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        }`}
      >
        <div className="grid gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={`/${link.href}`}
              onClick={closeMenu}
              className="border border-transparent px-3 py-3 font-semibold text-white/85 transition-colors hover:border-rayo-yellow/40 hover:text-rayo-yellow"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to={BOOKING_FORM_PATH}
            className="premium-button mt-2 justify-center px-5 py-4"
            onClick={closeMenu}
          >
            Agendar
          </Link>
        </div>
      </div>
    </header>
  )
}
