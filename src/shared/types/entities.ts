// Table types
export type TTableOrderSummary = {
  id: string
  owner: string
}

export type TTable = {
  id: string
  name: string
  status: 'available' | 'occupied'
  number: number
  orders: TTableOrderSummary[]
}

export type TTableAdd = {
  name: string
  number: number
}

// Order types
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

// Item types
export type TOrderItem = {
  id: string
  name: string
  status: 'pending' | 'preparing' | 'delivered'
}

export type TOrderItemKitchen = TOrderItem & { owner: string; tableName: string }
