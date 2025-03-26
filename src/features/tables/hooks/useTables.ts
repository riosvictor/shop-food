import { useEffect, useState } from 'react'
import { getTablesWithOrders, addTable, addOrderToTable } from '@/shared/libs/firestore'
import { TTable } from '@/shared/types/entities'
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
      await addTable({ name: `Mesa ${tables.length + 1}` })
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

  const addOrderToTableHandler = async (tableId: string, owner: string) => {
    try {
      const newOrder = await addOrderToTable({ tableId, owner })

      // Atualiza a mesa correspondente com o novo pedido
      setTables((prevTables) =>
        prevTables.map((table) => {
          if (table.id === tableId) {
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
