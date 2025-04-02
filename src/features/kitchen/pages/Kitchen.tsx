'use client'

import { useEffect, useState } from 'react'
import { TOrderItemKitchen, TOrderListener } from '@/shared/types'
import { OrderItemRow } from '../components/OrderItemRow'
import { OrderRepositoryFactory } from '@/shared/repositories'

const ordersWithPendingItems = (orders: TOrderListener[]): TOrderItemKitchen[] => {
  const filteredOrders = orders.filter((order) => order.items.some((item) => item.status === 'pending'))
  const enrichedItems = filteredOrders.map((order) =>
    order.items
      .filter((item) => item.status === 'pending')
      .map((item) => ({ ...item, owner: order.owner, tableName: order.tableName, orderId: order.id }))
  )
  return enrichedItems.flat()
}

export const KitchenPage = () => {
  const [orders, setOrders] = useState<TOrderItemKitchen[]>([])
  const orderRepository = OrderRepositoryFactory.create()

  useEffect(() => {
    const unsubscribe = orderRepository.listenOrders((orders) => {
      setOrders(ordersWithPendingItems(orders))
    })
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos Pendentes</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum item pendente.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Quantidade</th>
                <th className="border p-2 text-left">Item</th>
                <th className="border p-2 text-left">Dono</th>
                <th className="border p-2 text-left">Local</th>
                <th className="border p-2 text-center">Ação</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const key = `order-${index}-${order.id}`
                return <OrderItemRow key={key} item={order} />
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
