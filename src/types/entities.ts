export type TItem = {
  id: string
  name: string
  status: string
}

export type TItemAdd = TItem
export type TItemRemove = Omit<TItem, 'status' | 'name'>

export type TOrder = {
  id: string
  owner: string
  status: string
  items: TItem[]
}

export type TOrderListener = TOrder & {
  tableId: string
}

export type TCloseOrder = TOrder & {
  total: number
}

export type TTable = {
  id: string
  name: string
  orders: TOrder[]
  status: string
}

export type TTableAdd = Omit<TTable, 'id' | 'orders' | 'status'>
