'use client'

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TOrder, TOrderItem } from '@/shared/types'
import { OrderItemInput } from '../components/OrderItemInput'
import { OrderList } from '../components/OrderList'
import { ConfirmOrderModal } from '../components/ConfirmOrderModal'
import { OrderRepositoryFactory } from '@/shared/repositories'
import { CloseOrderModal } from '../components/CloseOrderModal'
import { Button } from '../../../components/ui/button'
import { toast } from 'sonner'

export const OrderPage = () => {
  const { tableId, orderId } = useParams<{ tableId: string; orderId: string }>()
  const [order, setOrder] = useState<TOrder | null>(null)
  const [newItems, setNewItems] = useState<TOrderItem[]>([]) // Itens pendentes
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false)
  const orderRepository = OrderRepositoryFactory.create()
  const navigate = useNavigate()

  useEffect(() => {
    if (!tableId || !orderId) return
    const unsubscribe = orderRepository.listenTableOrders(tableId, (orders) => {
      setOrder((prevOrder) => {
        const currentOrder = orders.find((o) => o.id === orderId) || null
        // Only update state if the order has changed
        if (JSON.stringify(prevOrder) !== JSON.stringify(currentOrder)) {
          return currentOrder
        }
        return prevOrder
      })
    })
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId, orderId])

  const handleAddItem = async () => {
    if (!orderId || newItems.length === 0) return
    await Promise.all(newItems.map((item) => orderRepository.addOrderItem(orderId, [item])))
    setNewItems([])
    setIsModalOpen(false)
  }

  const handleCloseOrder = async () => {
    if (!orderId) {
      toast.warning('Pedido não encontrado', {
        description: 'Não foi possível encerrar o pedido.'
      })
      return
    }

    try {
      await orderRepository.closeOrder(orderId)
      toast.success('Pedido encerrado', {
        description: 'O pedido foi encerrado com sucesso!'
      })
      navigate('/tables')
    } catch (error) {
      console.error('Erro ao encerrar o pedido:', error)
      toast.error('Erro ao encerrar o pedido', {
        description: 'Ocorreu um erro ao tentar encerrar o pedido.'
      })
    } finally {
      setIsCloseModalOpen(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pedido #{orderId}</h1>
        {order && (
          <Button variant="destructive" onClick={() => setIsCloseModalOpen(true)}>
            Encerrar Pedido
          </Button>
        )}
      </div>

      {order?.owner && (
        <p className="text-lg mb-4">
          <strong>Pedido de:</strong> {order.owner}
        </p>
      )}

      {order?.tableName && <p className="text-lg mb-4">{order?.tableName}</p>}

      <OrderItemInput newItems={newItems} setNewItems={setNewItems} onOpenModal={() => setIsModalOpen(true)} />
      <OrderList order={order} />

      <ConfirmOrderModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        newItems={newItems}
        onConfirm={handleAddItem}
      />

      {/* Encerramento do pedido */}

      <CloseOrderModal
        isOpen={isCloseModalOpen}
        setIsOpen={setIsCloseModalOpen}
        items={order?.items || []}
        onConfirm={handleCloseOrder}
      />
    </div>
  )
}
