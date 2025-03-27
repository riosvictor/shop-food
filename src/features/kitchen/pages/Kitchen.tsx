import { useEffect, useState } from 'react'
import { listenOrders } from '@/shared/libs/firestore'
import { TOrderItemKitchen, TOrderListener } from '@/shared/types/entities'
import { OrderItem } from '../components/OrderItem'

const ordersWithPendingItems = (orders: TOrderListener[]): TOrderItemKitchen[] => {
  const filteredOrders = orders.filter((order) => order.items.some((item) => item.status === 'pending'))
  const enrichedItems = filteredOrders.map((order) =>
    order.items
      .filter((item) => item.status === 'pending')
      .map((item) => ({ ...item, owner: order.owner, tableName: order.tableName, orderId: order.id }))
  )
  return enrichedItems.flat()
}

export const Kitchen = () => {
  const [orders, setOrders] = useState<TOrderItemKitchen[]>([])

  useEffect(() => {
    const unsubscribe = listenOrders((orders) => {
      setOrders(ordersWithPendingItems(orders))
      // console.log('📌 Pedidos recebidos:', orders)
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos Pendentes</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum item pendente.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderItem key={order.id} item={order} />
          ))}
        </div>
      )}
    </div>
  )
}
