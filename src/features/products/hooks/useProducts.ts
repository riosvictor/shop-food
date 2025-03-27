import { useEffect, useState, useCallback } from 'react'
import { getProducts } from '@/shared/libs/firestore'
import { TProduct } from '../../../shared/types/product'

export const useProducts = () => {
  const [products, setProducts] = useState<TProduct[]>([])
  const [availableProducts, setAvailableProducts] = useState<TProduct[]>([])

  const fetchProducts = useCallback(async () => {
    const data = await getProducts()
    setProducts(data)
    setAvailableProducts(data.filter((product) => product.available))
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, fetchProducts, availableProducts }
}
