import { IProductRepository } from './IProductRepository'
import { TProduct, TProductForm } from '../../types/product'

import listProducts from '@/../test/fixtures/products.json'

export class InMemoryProductRepository implements IProductRepository {
  private static instance: InMemoryProductRepository
  private products: TProduct[] = []

  private constructor() {
    // Carrega os dados do localStorage ou usa os dados padrão
    const storedProducts = localStorage.getItem('products')
    this.products = storedProducts ? JSON.parse(storedProducts) : listProducts
  }

  public static getInstance(): InMemoryProductRepository {
    if (!InMemoryProductRepository.instance) {
      InMemoryProductRepository.instance = new InMemoryProductRepository()
    }
    return InMemoryProductRepository.instance
  }

  private saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(this.products))
  }

  async getProducts(): Promise<TProduct[]> {
    return this.products
  }

  async deleteProduct(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== id)
    this.saveToLocalStorage()
  }

  async toggleProductAvailability(product: TProduct): Promise<void> {
    const index = this.products.findIndex((p) => p.id === product.id)
    if (index !== -1) {
      this.products[index].available = !this.products[index].available
      this.saveToLocalStorage()
    }
  }

  async upsertProduct(product: TProductForm): Promise<void> {
    if (product.id) {
      const index = this.products.findIndex((p) => p.id === product.id)
      if (index !== -1) {
        this.products[index] = { ...this.products[index], ...product }
      }
    } else {
      const newProduct: TProduct = { ...product, id: crypto.randomUUID() }
      this.products.push(newProduct)
    }
    this.saveToLocalStorage()
  }
}
