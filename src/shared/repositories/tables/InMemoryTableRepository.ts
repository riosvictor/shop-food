import listTables from '@/../test/fixtures/tables.json'
import listOrders from '@/../test/fixtures/orders.json'
import { ITableRepository } from './ITableRepository'
import { TOrder, TOrderAdd, TTable, TTableAdd } from '../../types'

export class InMemoryTableRepository implements ITableRepository {
  private static instance: InMemoryTableRepository
  private tables: TTable[] = []
  private orders: TOrder[] = []

  private constructor() {
    // Load data from localStorage or use default data
    const storedTables = localStorage.getItem('tables')
    this.tables = storedTables ? JSON.parse(storedTables) : listTables

    const storedOrders = localStorage.getItem('orders')
    this.orders = storedOrders ? JSON.parse(storedOrders) : listOrders
  }

  public static getInstance(): InMemoryTableRepository {
    if (!InMemoryTableRepository.instance) {
      InMemoryTableRepository.instance = new InMemoryTableRepository()
    }
    return InMemoryTableRepository.instance
  }

  private saveToLocalStorage() {
    localStorage.setItem('tables', JSON.stringify(this.tables))
  }

  private saveNewOrderInLocalStorage(order: TOrder) {
    const orders = localStorage.getItem('orders')
    const parsedOrders = orders ? JSON.parse(orders) : []
    parsedOrders.push(order)
    localStorage.setItem('orders', JSON.stringify(parsedOrders))
  }

  async addTable(table: TTableAdd): Promise<TTable> {
    const newTable: TTable = { ...table, id: crypto.randomUUID(), status: 'available', orders: [] }
    this.tables.push(newTable)
    this.saveToLocalStorage()
    return Promise.resolve(newTable)
  }

  async addOrderToTable(order: TOrderAdd): Promise<TOrder> {
    const table = this.tables.find((t) => t.id === order.tableId)
    if (!table) {
      return Promise.reject(new Error('Table not found'))
    }

    const newOrder: TOrder = {
      ...order,
      id: crypto.randomUUID(),
      status: 'open',
      items: []
    }

    this.saveNewOrderInLocalStorage(newOrder)

    return Promise.resolve(newOrder)
  }

  getTablesWithOrders(callback: (tables: TTable[]) => void) {
    const tablesWithOpenOrders = this.tables.map((table) => {
      const openOrders = this.orders.filter((order) => order.tableId === table.id && order.status === 'open')
      return {
        ...table,
        orders: openOrders
      }
    })
    callback(tablesWithOpenOrders)
    return () => {} // No-op for unsubscribe
  }
}
