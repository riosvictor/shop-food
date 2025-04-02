import { AuthUser } from '../../types'

export type AuthCallback = (user: AuthUser | null) => void

export interface IUserRepository {
  observeAuthState(callback: AuthCallback): () => void
  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
  register(email: string, password: string, role?: string): Promise<void>
}
