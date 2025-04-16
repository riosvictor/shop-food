import { IOrderRepository } from './IOrderRepository'
import { TOrder, TOrderItem, TOrderListener } from '../../types'

import listOrders from '@/../test/fixtures/orders.json'

export class InMemoryOrderRepository implements IOrderRepository {
  private static instance: InMemoryOrderRepository
  private orders: TOrder[] = []

  private constructor() {
    // Carrega os dados do localStorage ou usa os dados padrão
    const storedOrders = localStorage.getItem('orders')
    this.orders = storedOrders ? JSON.parse(storedOrders) : listOrders
  }

  public static getInstance(): InMemoryOrderRepository {
    if (!InMemoryOrderRepository.instance) {
      InMemoryOrderRepository.instance = new InMemoryOrderRepository()
    }
    return InMemoryOrderRepository.instance
  }

  private saveToLocalStorage() {
    localStorage.setItem('orders', JSON.stringify(this.orders))
  }

  async addOrderItem(orderId: string, newItems: TOrderItem[]): Promise<void> {
    const order = this.orders.find((o) => o.id === orderId)
    if (order) {
      order.items.push(...newItems)
      this.saveToLocalStorage()
    }
  }

  async removeOrderItem(orderId: string, itemId: string): Promise<void> {
    const order = this.orders.find((o) => o.id === orderId)
    if (order) {
      order.items = order.items.filter((item) => item.id !== itemId)
      this.saveToLocalStorage()
    }
  }

  async updateItemStatus(orderId: string, itemId: string, status: 'delivered' | 'pending'): Promise<void> {
    const order = this.orders.find((o) => o.id === orderId)
    if (order) {
      const item = order.items.find((i) => i.id === itemId && i.status !== status)
      if (item) {
        item.status = status
        this.saveToLocalStorage()
      }
    }
  }

  async updateOrderStatus(orderId: string, status: TOrder['status']): Promise<void> {
    const order = this.orders.find((o) => o.id === orderId)
    if (order) {
      order.status = status
      this.saveToLocalStorage()
    }
  }

  listenOrders(callback: (orders: TOrderListener[]) => void): () => void {
    // Chama o callback inicialmente com os dados atuais
    callback(this.orders as TOrderListener[])

    // Retorna uma função de "unsubscribe" vazia
    return () => {}
  }

  listenTableOrders(tableId: string, callback: (orders: TOrder[]) => void): () => void {
    // Filtra os pedidos pela tableId e chama o callback
    const filteredOrders = this.orders.filter((order) => order.tableId === tableId)
    callback(filteredOrders)

    // Retorna uma função de "unsubscribe" vazia
    return () => {}
  }

  async closeOrder(orderId: string): Promise<void> {
    const order = this.orders.find((o) => o.id === orderId)
    if (order) {
      order.status = 'closed'
      this.saveToLocalStorage()
    }
  }
}
