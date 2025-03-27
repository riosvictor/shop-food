import { useEffect, useState } from 'react'
import { getTablesWithOrders, addTable, addOrderToTable } from '@/shared/libs/firestore'
import { TOrderAdd, TTable } from '@/shared/types'
import { toast } from 'sonner'

export const useTables = () => {
  const [tables, setTables] = useState<TTable[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    const unsubscribe = getTablesWithOrders((data) => {
      setTables(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const addNewTable = async () => {
    setAdding(true)
    try {
      const tableNumber = tables.length + 1
      await addTable({ name: `Mesa ${tableNumber}`, number: tableNumber })
      toast.success('Mesa adicionada com sucesso!')
    } catch (e) {
      const error = e as Error
      const errorMessage = `Erro ao adicionar mesa: ${error.message}`
      setError(errorMessage)
      console.error(errorMessage)
      toast.error(errorMessage)
    } finally {
      setAdding(false)
    }
  }

  const addOrderToTableHandler = async (order: TOrderAdd) => {
    try {
      const newOrder = await addOrderToTable(order)

      // Atualiza a mesa correspondente com o novo pedido
      setTables((prevTables) =>
        prevTables.map((table) => {
          if (table.id === order.tableId) {
            return { ...table, orders: [...table.orders, newOrder] }
          }
          return table
        })
      )

      toast.success('Novo pedido criado com sucesso!')
    } catch (err) {
      console.error(err)
      toast.error('Erro ao criar pedido.')
    }
  }

  return {
    tables,
    loading,
    error,
    adding,
    addNewTable,
    addOrderToTableHandler
  }
}
