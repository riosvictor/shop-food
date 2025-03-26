import { useEffect, useState } from 'react'
import { listenOrders } from '@/shared/libs/firestore'
import { TOrderListener } from '@/shared/types/entities'

export const Kitchen = () => {
  const [orders, setOrders] = useState<TOrderListener[]>([])

  useEffect(() => {
    const unsubscribe = listenOrders(setOrders)
    return () => unsubscribe()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos Pendentes</h1>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum item pendente.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) =>
            order.items
              .filter((item) => item.status === 'pending')
              .map((item) => (
                <div key={item.id} className="border p-4 rounded-lg">
                  <p>{item.name}</p>
                  <p className="text-sm text-gray-500">Mesa: {order.tableId}</p>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  )
}
