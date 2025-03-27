import { User } from 'firebase/auth'

export interface AuthUser extends User {
  role?: string
}
