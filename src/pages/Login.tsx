import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '@/components/ui/button'
import { InputField } from '../components/InputField'
import { RegisterModal } from '../components/RegisterModal'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const { login, register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const clearRegisterFields = () => {
    setRegisterEmail('')
    setRegisterPassword('')
  }
  const clearLoginFields = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      clearLoginFields()
      toast.success('Login efetuado', {
        description: 'Você foi autenticado com sucesso!'
      })
      // Redirecionar para a página de mesas
      navigate('/tables')
    } catch {
      toast.error('Erro de Login', {
        description: 'Credenciais inválidas!'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(registerEmail, registerPassword)
      setIsRegistering(false) // Fecha o modal ao cadastrar
      toast.success('Conta criada', {
        description: 'Sua conta foi criada com sucesso!'
      })
      clearRegisterFields()
    } catch (e) {
      const error = e as Error
      toast.error('Erro ao criar conta', {
        description: `Tente novamente mais tarde. Erro: ${error.message}`
      })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputField
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" className="w-full bg-blue-500" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </Button>
      </form>

      <div className="text-center mt-4">
        <RegisterModal
          isRegistering={isRegistering}
          setIsRegistering={setIsRegistering}
          handleRegister={handleRegister}
          registerEmail={registerEmail}
          setRegisterEmail={setRegisterEmail}
          registerPassword={registerPassword}
          setRegisterPassword={setRegisterPassword}
        />
      </div>
    </div>
  )
}
