import { collection, getDocs, addDoc, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../../libs/firebase'
import { firebaseDocuments } from '../../helpers/constants'
import { ITableRepository } from './ITableRepository'
import { TOrder, TOrderAdd, TTable, TTableAdd } from '../../types'

export class FirebaseTableRepository implements ITableRepository {
  private tablesCollection = collection(db, firebaseDocuments.TABLES)
  private ordersCollection = collection(db, firebaseDocuments.ORDERS)

  async addTable(table: TTableAdd): Promise<TTable> {
    const newTable = { ...table, status: 'available', orders: [] }
    const docRef = await addDoc(this.tablesCollection, newTable)
    return { id: docRef.id, ...newTable } as TTable
  }

  async addOrderToTable(order: TOrderAdd): Promise<TOrder> {
    const newOrder: Omit<TOrder, 'id'> = {
      ...order,
      status: 'open',
      items: []
    }
    const orderRef = await addDoc(this.ordersCollection, newOrder)
    return { id: orderRef.id, ...newOrder }
  }

  getTablesWithOrders(callback: (tables: TTable[]) => void) {
    return onSnapshot(this.tablesCollection, async (snapshot) => {
      const tables = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TTable[]

      // Buscar pedidos de cada mesa
      for (const table of tables) {
        const ordersQuery = query(
          this.ordersCollection,
          where('tableId', '==', table.id),
          where('status', '==', 'open')
        )
        const ordersSnapshot = await getDocs(ordersQuery)
        table.orders = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TOrder[]
      }

      callback(tables)
    })
  }
}
