import listUsers from '@/../test/fixtures/users.json'
import { AuthUser } from '../../types'
import { AuthCallback, IUserRepository } from './IUserRepository'

const loadUsers = (): AuthUser[] => {
  const storedUsers = localStorage.getItem('users')
  return storedUsers ? (JSON.parse(storedUsers) as AuthUser[]) : (listUsers as unknown as AuthUser[])
}

const saveToLocalStorage = (users: AuthUser[]) => {
  localStorage.setItem('users', JSON.stringify(users))
}

const users = loadUsers()

export const InMemoryUserRepository: IUserRepository = {
  login(email: string, password: string): Promise<void> {
    const user = users.find((user) => user.email === email && !!password)
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      return Promise.resolve()
    } else {
      return Promise.reject(new Error('Invalid email or password'))
    }
  },

  logout(): Promise<void> {
    localStorage.removeItem('currentUser')
    return Promise.resolve()
  },

  observeAuthState(callback: AuthCallback): () => void {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      callback(JSON.parse(currentUser))
    } else {
      callback(null)
    }
    return () => {}
  },

  register(email: string, _password: string, role: string = 'user'): Promise<void> {
    const userExists = users.some((user) => user.email === email)
    if (userExists) {
      return Promise.reject(new Error('User already exists'))
    } else {
      const newUser: AuthUser = { uid: crypto.randomUUID(), email, role } as AuthUser
      users.push(newUser)
      saveToLocalStorage(users)
      return Promise.resolve()
    }
  }
}
