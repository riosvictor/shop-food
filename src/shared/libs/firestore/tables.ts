import { collection, getDocs, onSnapshot, addDoc, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { TOrder, TOrderAdd, TTable, TTableAdd } from '../../types/entities'
import { firebaseDocuments } from '../../helpers/constants'

const tablesCollection = collection(db, firebaseDocuments.TABLES)
const ordersCollection = collection(db, firebaseDocuments.ORDERS)

export const getTables = async (): Promise<TTable[]> => {
  const querySnapshot = await getDocs(tablesCollection)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TTable[]
}

export const addTable = async (table: TTableAdd): Promise<TTable> => {
  const newTable = { ...table, status: 'available', orders: [] }
  const docRef = await addDoc(tablesCollection, newTable)
  return { id: docRef.id, ...newTable } as TTable
}

export const addOrderToTable = async (order: TOrderAdd): Promise<TOrder> => {
  const newOrder: Omit<TOrder, 'id'> = {
    ...order,
    status: 'open',
    items: []
  }
  const orderRef = await addDoc(ordersCollection, newOrder)
  return { id: orderRef.id, ...newOrder }
}

export const getTablesWithOrders = (callback: (tables: TTable[]) => void) => {
  return onSnapshot(tablesCollection, async (snapshot) => {
    const tables = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TTable[]

    // Buscar pedidos de cada mesa
    for (const table of tables) {
      const ordersQuery = query(ordersCollection, where('tableId', '==', table.id))
      const ordersSnapshot = await getDocs(ordersQuery)
      table.orders = ordersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TOrder[]
    }

    callback(tables)
  })
}
