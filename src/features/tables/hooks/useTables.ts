import { useEffect, useState } from 'react'
import { TOrderAdd, TTable } from '@/shared/types'
import { toast } from 'sonner'
import { TableRepositoryFactory } from '../../../shared/repositories/tables/TableRepositoryFactory'

export const useTables = () => {
  const [tables, setTables] = useState<TTable[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(false)
  const tableRepository = TableRepositoryFactory.create()

  useEffect(() => {
    const unsubscribe = tableRepository.getTablesWithOrders((data) => {
      setTables(data)
      setLoading(false)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addNewTable = async () => {
    setAdding(true)
    try {
      const tableNumber = tables.length + 1
      await tableRepository.addTable({ name: `Mesa ${tableNumber}`, number: tableNumber })
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
      const newOrder = await tableRepository.addOrderToTable(order)

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
