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
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full rounded border bg-rayo-panel px-4 py-3 text-base text-white transition-colors focus:outline-none focus:ring-2 focus:ring-rayo-yellow ${
        hasError ? 'border-red-500/50 focus:ring-red-500' : 'border-white/10 hover:border-white/20'
      }`}
      style={{ touchAction: 'manipulation', minHeight: '48px', fontSize: '16px' }}
    >
      {firstOptionEmpty && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}
