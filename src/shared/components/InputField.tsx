import { FC } from 'react'
import { Input } from '@/components/ui/input'

interface InputFieldProps {
  id?: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputField: FC<InputFieldProps> = ({ id, type, placeholder, value, onChange }) => (
  <Input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} className="w-full" />
)
