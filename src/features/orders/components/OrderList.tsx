import { OrderCard } from './OrderCard'
import { TOrder } from '@/shared/types/entities'

export const OrderList = ({
  orders,
  onRemoveItem
}: {
  orders: TOrder[]
  onRemoveItem: (orderId: string, itemId: string) => void
}) => {
  if (orders.length === 0) {
    return <p className="text-gray-500 text-center">Nenhum pedido para esta mesa.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onRemoveItem={onRemoveItem} />
      ))}
    </div>
  )
}
