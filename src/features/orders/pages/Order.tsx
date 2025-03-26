import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { listenTableOrders, addOrderItem, removeOrderItem } from '@/shared/libs/firestore'
import { TOrder, TItem } from '@/shared/types/entities'
import { OrderItemInput } from '../components/OrderItemInput'
import { OrderList } from '../components/OrderList'

export const Order = () => {
  const { tableId, orderId } = useParams<{ tableId: string; orderId: string }>()
  const [orders, setOrders] = useState<TOrder[]>([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    if (!tableId) return
    const unsubscribe = listenTableOrders(tableId, setOrders)
    return () => unsubscribe()
  }, [tableId])

  const handleAddItem = async () => {
    if (!orderId || newItem.trim() === '') return
    const newItemObj: TItem = { id: Date.now().toString(), name: newItem, status: 'pending' }
    await addOrderItem(orderId, newItemObj)
    setNewItem('')
  }

  const handleRemoveItem = async (orderId: string, itemId: string) => {
    if (!tableId) return
    await removeOrderItem(orderId, itemId)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Pedido #{orderId} - Mesa {tableId}
      </h1>
      <OrderItemInput newItem={newItem} setNewItem={setNewItem} onAddItem={handleAddItem} />
      <OrderList orders={orders} onRemoveItem={handleRemoveItem} />
    </div>
  )
}
