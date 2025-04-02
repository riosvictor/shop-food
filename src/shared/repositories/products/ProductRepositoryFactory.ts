import { IProductRepository } from './IProductRepository'
import { InMemoryProductRepository } from './InMemoryProductRepository'
import { FirebaseProductRepository } from './FirebaseProductRepository'

export class ProductRepositoryFactory {
  static create(): IProductRepository {
    const useInMemory = import.meta.env.VITE_USE_IN_MEMORY_REPOSITORY === 'true'
    if (useInMemory) {
      return InMemoryProductRepository.getInstance()
    }
    return new FirebaseProductRepository()
  }
}
