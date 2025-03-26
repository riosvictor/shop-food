import { TTable } from '../types/entities'
import { TableCard } from './TableCard'

export const TablesList = ({ tables }: { tables: TTable[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {tables.map((table) => (
      <TableCard key={table.id} table={table} />
    ))}
  </div>
)
