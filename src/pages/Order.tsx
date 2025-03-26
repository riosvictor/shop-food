import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { listenTableOrders, addOrderItem, removeOrderItem } from '../libs/firestore'
import { TOrder, TItem } from '../types/entities'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OrderCard } from '../components/OrderCard'

export const Order = () => {
  const { tableId } = useParams<{ tableId?: string }>()
  const [orders, setOrders] = useState<TOrder[]>([])
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    if (!tableId) return

    const unsubscribe = listenTableOrders(tableId, setOrders)
    return () => unsubscribe()
  }, [tableId])

  const handleAddItem = async () => {
    if (!tableId || newItem.trim() === '') return

    const newItemObj: TItem = {
      id: Date.now().toString(),
      name: newItem,
      status: 'pending'
    }

    await addOrderItem(tableId, newItemObj)
    setNewItem('')
  }

  const handleRemoveItem = async (orderId: string, itemId: string) => {
    if (!tableId) return
    await removeOrderItem(tableId, orderId, itemId)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pedido - Mesa {tableId || 'N/A'}</h1>

      <div className="flex gap-2 mb-4">
        <Input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Novo item" />
        <Button onClick={handleAddItem} disabled={!newItem.trim()}>
          Adicionar
        </Button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum pedido para esta mesa.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} onRemoveItem={handleRemoveItem} />
          ))}
        </div>
      )}
    </div>
  )
}
