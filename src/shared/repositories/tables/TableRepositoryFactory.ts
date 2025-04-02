import { ITableRepository } from './ITableRepository'
import { InMemoryTableRepository } from './InMemoryTableRepository'
import { FirebaseTableRepository } from './FirebaseTableRepository'

export class TableRepositoryFactory {
  static create(): ITableRepository {
    const useInMemory = import.meta.env.VITE_USE_IN_MEMORY_REPOSITORY === 'true'
    if (useInMemory) {
      return InMemoryTableRepository.getInstance()
    }
    return new FirebaseTableRepository()
  }
}
