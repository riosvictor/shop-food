export type TOrder = {
  id: string
  tableId: string
  tableName: string
  owner: string
  status: 'open' | 'closed'
  items: TOrderItem[]
}

export type TOrderAdd = {
  tableId: string
  owner: string
  tableName: string
}

export type TOrderListener = TOrder & { tableName: string }

export type TOrderItem = {
  id: string
  name: string
  price: number
  quantity: number
  status: 'pending' | 'preparing' | 'delivered'
}

export type TOrderItemKitchen = TOrderItem & { owner: string; tableName: string; orderId: string }
