import { TProduct, TProductForm } from '../../types/product'

export interface IProductRepository {
  getProducts(): Promise<TProduct[]>
  deleteProduct(id: string): Promise<void>
  toggleProductAvailability(product: TProduct): Promise<void>
  upsertProduct(product: TProductForm): Promise<void>
}
