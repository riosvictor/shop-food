import { IOrderRepository } from './IOrderRepository'
import { FirebaseOrderRepository } from './FirebaseOrderRepository'
import { InMemoryOrderRepository } from './InMemoryOrderRepository'

export class OrderRepositoryFactory {
  static create(): IOrderRepository {
    const useInMemory = import.meta.env.VITE_USE_IN_MEMORY_REPOSITORY === 'true'
    if (useInMemory) {
      return InMemoryOrderRepository.getInstance()
    }
    return new FirebaseOrderRepository()
  }
}
