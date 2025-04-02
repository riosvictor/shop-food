import { IOrderRepository } from './IOrderRepository'
import { FirebaseOrderRepository } from './FirebaseOrderRepository'
import { InMemoryOrderRepository } from './InMemoryOrderRepository'

export class OrderRepositoryFactory {
  static create(): IOrderRepository {
    const useInMemory = import.meta.env.VITE_USE_IN_MEMORY_REPOSITORY === 'true'
    if (useInMemory) {
      console.log('Using InMemoryOrderRepository')
      return InMemoryOrderRepository.getInstance()
    }
    console.log('Using FirebaseOrderRepository')
    return new FirebaseOrderRepository()
  }
}
