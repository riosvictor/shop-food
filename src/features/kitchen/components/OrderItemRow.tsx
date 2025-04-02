import { TOrderItemKitchen } from '@/shared/types'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { OrderRepositoryFactory } from '../../../shared/repositories'

type OrderItemRowProps = {
  item: TOrderItemKitchen
}

export const OrderItemRow = ({ item }: OrderItemRowProps) => {
  const { id: itemId, orderId, owner, tableName, name, quantity } = item
  const [confirming, setConfirming] = useState(false)
  const orderRepository = OrderRepositoryFactory.create()

  const handleMarkAsDelivered = async () => {
    if (!confirming) {
      setConfirming(true)
      return
    }
    await orderRepository.updateItemStatus(orderId, itemId, 'delivered')
    setConfirming(false)
  }

  return (
    <tr className="border-b">
      <td className="border p-2">{quantity}</td>
      <td className="border p-2">{name}</td>
      <td className="border p-2">{owner}</td>
      <td className="border p-2">{tableName}</td>
      <td className="border p-2 text-center">
        {confirming ? (
          <div className="flex gap-2 justify-center">
            <Button className="bg-red-500 hover:bg-red-600 px-4 py-1" onClick={() => setConfirming(false)}>
              Cancelar
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 px-4 py-1" onClick={handleMarkAsDelivered}>
              Confirmar
            </Button>
          </div>
        ) : (
          <Button className="bg-green-500 hover:bg-green-600 px-4 py-1" onClick={handleMarkAsDelivered}>
            Marcar como entregue
          </Button>
        )}
      </td>
    </tr>
  )
}
