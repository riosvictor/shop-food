import {
  collection,
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
  getDoc,
  addDoc,
  arrayUnion,
  query,
  where
} from 'firebase/firestore'
import { db } from './firebase'
import { TItem, TOrder, TOrderAdd, TOrderListener, TTable, TTableAdd } from '../types/entities'

const docs = {
  TABLES: 'tables',
  ORDERS: 'orders'
}
const tablesCollection = collection(db, docs.TABLES)
const ordersCollection = collection(db, docs.ORDERS)

// Tables functions
export const getTables = async (): Promise<TTable[]> => {
  const querySnapshot = await getDocs(tablesCollection)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TTable[]
}

export const addTable = async (table: TTableAdd): Promise<TTable> => {
  const newTable = { name: table.name, status: 'available', orders: [] }
  const docRef = await addDoc(tablesCollection, newTable)
  return { id: docRef.id, ...newTable } as TTable
}

export const addOrderToTable = async (order: TOrderAdd): Promise<TOrder> => {
  const newOrder = {
    tableId: order.tableId,
    owner: order.owner,
    status: 'pending',
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

// Orders functions
export const addOrderItem = async (orderId: string, newItem: TItem) => {
  const orderRef = doc(db, docs.ORDERS, orderId)

  await updateDoc(orderRef, {
    items: arrayUnion(newItem) // Adiciona o novo item ao array, sem carregar o estado atual
  })
}

export const removeOrderItem = async (orderId: string, itemId: string) => {
  const orderRef = doc(db, docs.ORDERS, orderId)
  const orderSnap = await getDoc(orderRef)

  if (!orderSnap.exists()) return

  const orderData = orderSnap.data()

  const updatedItems = orderData.items.filter((item: TItem) => item.id !== itemId)

  await updateDoc(orderRef, { items: updatedItems })
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  const orderRef = doc(db, docs.ORDERS, orderId)
  await updateDoc(orderRef, { status })
}

export const listenOrders = (callback: (orders: TOrderListener[]) => void) => {
  const unsubscribeTables = onSnapshot(collection(db, docs.TABLES), (tableSnapshot) => {
    const orderListeners: TOrderListener[] = []
    tableSnapshot.docs.forEach((tableDoc) => {
      const tableId = tableDoc.id
      const ordersCollection = collection(db, docs.ORDERS, tableId)
      // Agora escutamos os pedidos dentro de cada mesa em tempo real
      const unsubscribeOrders = onSnapshot(ordersCollection, (orderSnapshot) => {
        orderSnapshot.docs.forEach((orderDoc) => {
          const orderData = orderDoc.data() as Omit<TOrder, 'id'> // Garante que o tipo base é TOrder sem o id
          orderListeners.push({
            id: orderDoc.id,
            ...orderData
          } as TOrderListener)
        })
        callback(orderListeners)
      })
      return unsubscribeOrders
    })
  })
  return unsubscribeTables
}

export const listenTableOrders = (tableId: string, callback: (orders: TOrder[]) => void) => {
  const ordersQuery = query(ordersCollection, where('tableId', '==', tableId))

  return onSnapshot(ordersQuery, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TOrder[]
    callback(orders)
  })
}
