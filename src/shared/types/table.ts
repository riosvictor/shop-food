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
