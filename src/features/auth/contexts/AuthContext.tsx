'use client'

import { createContext, useEffect, useState } from 'react'
import { AuthUser } from '../../../shared/types'
import { UserRepositoryFactory } from '../../../shared/repositories'

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
  const { login, logout, register, observeAuthState } = UserRepositoryFactory.create()

  useEffect(() => {
    const unsubscribe = observeAuthState((currentUser) => {
      setUser(currentUser)
      if (initialLoading) {
        setInitialLoading(false)
      }
    })
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, register, initialLoading }}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
