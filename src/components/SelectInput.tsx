import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectInputProps {
  id: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  placeholder?: string
  hasError?: boolean
  firstOptionEmpty?: boolean
}

export default function SelectInput({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = 'Selecciona una opción',
  hasError = false,
  firstOptionEmpty = true,
}: SelectInputProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLSelectElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <select
        ref={selectRef}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        className={`w-full px-4 py-3 bg-rayo-panel border rounded text-white cursor-pointer appearance-none opacity-0 absolute inset-0 ${
          hasError ? 'border-red-500/50' : 'border-white/10'
        }`}
      >
        {firstOptionEmpty && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div
        className={`w-full px-4 py-3 bg-rayo-panel border rounded transition-colors flex items-center justify-between pointer-events-none ${
          hasError ? 'border-red-500/50' : 'border-white/10'
        }`}
      >
        <span className={value ? 'text-white' : 'text-white/40'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`h-5 w-5 text-rayo-yellow/50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
    </div>
  )
}
