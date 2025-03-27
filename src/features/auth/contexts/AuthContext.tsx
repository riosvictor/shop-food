import { createContext, useEffect, useState } from 'react'
import { observeAuthState, login, logout, register } from '@/shared/libs/firestore'
import { AuthUser } from '../../../shared/types/entities'

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (email: string, password: string, role?: string) => Promise<void>
  initialLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [initialLoading, setInitialLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = observeAuthState((currentUser) => {
      setUser(currentUser)
      if (initialLoading) {
        setInitialLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, register, initialLoading }}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
