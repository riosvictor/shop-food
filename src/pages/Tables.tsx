import { useEffect, useState } from 'react'
import { getTables, addTable } from '../libs/firestore'
import { TTable } from '../types/entities'
import { Button } from '@/components/ui/button'
import { TablesFeedback } from '../components/TablesFeedback'
import { TablesList } from '../components/TablesList'

export const Tables = () => {
  const [tables, setTables] = useState<TTable[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [adding, setAdding] = useState(false)
  const showTables = !loading && !error && tables.length > 0

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const data = await getTables()
        setTables(data)
      } catch (err) {
        setError('Erro ao carregar mesas.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchTables()
  }, [])

  const handleAddTable = async () => {
    setAdding(true)
    try {
      const newTable = await addTable({ name: `Mesa ${tables.length + 1}` })
      setTables((prev) => [...prev, newTable])
    } catch (err) {
      console.error('Erro ao adicionar mesa:', err)
      setError('Erro ao adicionar mesa.')
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Mesas</h1>
        <Button onClick={handleAddTable} disabled={adding}>
          {adding ? 'Adicionando...' : 'Adicionar Mesa'}
        </Button>
      </div>

      <TablesFeedback loading={loading} error={error} tables={tables} />

      {showTables && <TablesList tables={tables} />}
    </div>
  )
}
