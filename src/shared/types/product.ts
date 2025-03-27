export type TProduct = {
  id: string
  name: string
  price: number
  available: boolean
}

export type TProductForm = Omit<TProduct, 'id'> & { id?: string }
