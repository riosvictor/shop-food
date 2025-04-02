import { TOrder, TOrderAdd, TTable, TTableAdd } from '../../types'

export interface ITableRepository {
  addTable(table: TTableAdd): Promise<TTable>
  addOrderToTable(order: TOrderAdd): Promise<TOrder>
  getTablesWithOrders: (callback: (tables: TTable[]) => void) => () => void
}
