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
      className={`w-full rounded border bg-rayo-panel px-4 py-3 text-base text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rayo-yellow focus:shadow-[0_0_20px_rgba(250,204,21,0.18)] ${
        hasError ? 'border-red-500/50 focus:ring-red-500' : 'border-rayo-purple/30 hover:border-rayo-purple/60 focus:border-rayo-yellow/80'
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
