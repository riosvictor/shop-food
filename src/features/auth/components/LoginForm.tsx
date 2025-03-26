import { useState, FC } from 'react'
import { Button } from '@/components/ui/button'
import { InputField } from '@/shared/components/InputField'

type LoginFormProps = {
  onSubmit: (email: string, password: string) => void
  loading?: boolean
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, loading = false }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(email, password) // Passa os dados para o pai
    setEmail('') // Limpa o campo de email após o envio
    setPassword('') // Limpa o campo de senha após o envio
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" className="w-full bg-blue-500" disabled={loading}>
        {loading ? 'Carregando...' : 'Entrar'}
      </Button>
    </form>
  )
}
