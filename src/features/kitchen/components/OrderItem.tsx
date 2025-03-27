import { TOrderItemKitchen } from '@/shared/types/entities'
import { updateItemStatus } from '@/shared/libs/firestore'
import { Button } from '@/components/ui/button'

type OrderItemProps = {
  item: TOrderItemKitchen
}

export const OrderItem = ({ item }: OrderItemProps) => {
  const { id: orderId, owner, tableName, name } = item
  const handleMarkAsDelivered = async () => {
    await updateItemStatus(orderId, item.id, 'delivered')
  }

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <p className="font-semibold">{name}</p>
      <p className="text-sm text-gray-500">Dono: {owner}</p>
      <p className="text-sm text-gray-500">Local: {tableName}</p>
      <Button className="mt-2 bg-green-500 hover:bg-green-600 w-full" onClick={handleMarkAsDelivered}>
        Marcar como entregue
      </Button>
    </div>
  )
}
