import { TTable } from '@/shared/types/entities'
import { TableCard } from './TableCard'

type TablesListProps = {
  tables: TTable[]
  onAddOrder: (tableId: string, owner: string) => void
}

export const TablesList = ({ tables, onAddOrder }: TablesListProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {tables.map((table) => (
      <TableCard key={table.id} table={table} onAddOrder={onAddOrder} />
    ))}
  </div>
)
