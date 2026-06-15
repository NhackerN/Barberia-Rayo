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
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 pr-12 bg-rayo-panel border rounded text-white cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-rayo-yellow appearance-none relative z-30 pointer-events-auto ${
          hasError ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 hover:border-white/20'
        }`}
        style={{ touchAction: 'manipulation', minHeight: '48px' }}
      >
        {firstOptionEmpty && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-rayo-yellow/50 pointer-events-none" />
    </div>
  )
}
