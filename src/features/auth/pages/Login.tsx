import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loading } from '../../../shared/components/Loading'
import { useAuth } from '../hooks/useAuth'
import { LoginForm } from '../components/LoginForm'
import { RegisterModal } from '../components/RegisterModal'

export const Login = () => {
  const { login, register, user, initialLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  useEffect(() => {
    if (!initialLoading && user) {
      const from = location.state?.from?.pathname || '/tables' // Pega a página anterior ou manuseia o fallback
      navigate(from, { replace: true })
    }
  }, [initialLoading, user, navigate, location])

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    try {
      await login(email, password)
      toast.success('Login efetuado', {
        description: 'Você foi autenticado com sucesso!'
      })
      navigate('/tables')
    } catch {
      toast.error('Erro de Login', {
        description: 'Credenciais inválidas!'
      })
      throw new Error('Credenciais inválidas')
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
      setRegisterEmail('')
      setRegisterPassword('')
    } catch (e) {
      const error = e as Error
      toast.error('Erro ao criar conta', {
        description: `Tente novamente mais tarde. Erro: ${error.message}`
      })
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading message="Carregando..." size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <LoginForm onSubmit={handleLogin} loading={loading} />

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
