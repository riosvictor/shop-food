import { FC } from 'react'
import { Input } from '@/components/ui/input'

interface InputFieldProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputField: FC<InputFieldProps> = ({ type, placeholder, value, onChange }) => (
  <Input type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full" />
)
