import { IUserRepository } from './IUserRepository'
import { InMemoryUserRepository } from './InMemoryUserRepository'
import { FirebaseUserRepository } from './FirebaseUserRepository'

export class UserRepositoryFactory {
  static create(): IUserRepository {
    const useInMemory = import.meta.env.VITE_USE_IN_MEMORY_REPOSITORY === 'true'
    if (useInMemory) {
      return InMemoryUserRepository
    }
    return new FirebaseUserRepository()
  }
}
