import { useEffect, useState } from 'react'
import { getAvailableProducts } from '@/shared/libs/firestore'

export type TProduct = {
  id: string
  name: string
  price: number
  available: boolean
}

export const useProducts = () => {
  const [products, setProducts] = useState<TProduct[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const productsList = await getAvailableProducts()
      setProducts(productsList)
    }
    fetchProducts()
  }, [])

  return products
}
