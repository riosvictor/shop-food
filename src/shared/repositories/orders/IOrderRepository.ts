import { TOrder, TOrderItem, TOrderListener } from '../../types'

export interface IOrderRepository {
  updateOrderStatus(orderId: string, status: string): Promise<void>
  listenOrders(callback: (orders: TOrderListener[]) => void): () => void
  listenTableOrders(tableId: string, callback: (orders: TOrder[]) => void): () => void

  addOrderItem(orderId: string, newItems: TOrderItem[]): Promise<void>
  removeOrderItem(orderId: string, itemId: string): Promise<void>
  updateItemStatus(orderId: string, itemId: string, status: string): Promise<void>
}
