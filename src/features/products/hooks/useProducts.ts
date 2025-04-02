import { useEffect, useState, useCallback } from 'react'
import { TProduct } from '../../../shared/types/product'
import { ProductRepositoryFactory } from '../../../shared/repositories'

export const useProducts = () => {
  const [products, setProducts] = useState<TProduct[]>([])
  const [availableProducts, setAvailableProducts] = useState<TProduct[]>([])
  const productsRepository = ProductRepositoryFactory.create()

  const fetchProducts = useCallback(async () => {
    const data = await productsRepository.getProducts()
    setProducts(data)
    setAvailableProducts(data.filter((product) => product.available))
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, fetchProducts, availableProducts }
}
