'use client'

import { TablesFeedback } from '../components/TablesFeedback'
import { TablesHeader } from '../components/TablesHeader'
import { TablesList } from '../components/TablesList'
import { useTables } from '../hooks/useTables'

export const TablesPage = () => {
  const { tables, loading, error, adding, addNewTable, addOrderToTableHandler } = useTables()
  console.log(tables)

  const showTables = !loading && !error && tables.length > 0

  return (
    <div className="container mx-auto p-6">
      <TablesHeader onAddTable={addNewTable} adding={adding} />

      <TablesFeedback loading={loading} error={error} tables={tables} />

      {showTables && <TablesList tables={tables} onAddOrder={addOrderToTableHandler} />}
    </div>
  )
}
