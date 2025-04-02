import { ITableRepository } from './ITableRepository'
import { InMemoryTableRepository } from './InMemoryTableRepository'
import { FirebaseTableRepository } from './FirebaseTableRepository'

export class TableRepositoryFactory {
  static create(): ITableRepository {
    const useInMemory = import.meta.env.VITE_USE_IN_MEMORY_REPOSITORY === 'true'
    if (useInMemory) {
      console.log('Using InMemoryTableRepository')
      return InMemoryTableRepository.getInstance()
    }
    console.log('Using FirebaseTableRepository')
    return new FirebaseTableRepository()
  }
}
