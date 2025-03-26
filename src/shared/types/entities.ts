// Table types
export type TTableOrders = {
  id: string
  owner: string
}

export type TTable = {
  id: string
  name: string
  status: 'available' | 'occupied'
  orders: TTableOrders[]
}

export type TTableAdd = Omit<TTable, 'id' | 'orders' | 'status'>

// Order types
export type TOrder = {
  id: string
  tableId: string
  owner: string
  status: string
  items: TItem[]
}

export type TOrderAdd = Omit<TOrder, 'id' | 'items' | 'status'>

export type TItem = {
  id: string
  name: string
  status: string
}

export type TItemAdd = TItem
export type TItemRemove = Omit<TItem, 'status' | 'name'>

export type TOrderListener = TOrder & {
  tableId: string
}

export type TCloseOrder = TOrder & {
  total: number
}
