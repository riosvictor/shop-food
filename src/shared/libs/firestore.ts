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
import { TOrderItem, TOrder, TOrderAdd, TOrderListener, TTable, TTableAdd } from '../types/entities'

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

// Orders functions
export const addOrderItem = async (orderId: string, newItem: TOrderItem) => {
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

  const updatedItems = orderData.items.filter((item: TOrderItem) => item.id !== itemId)

  await updateDoc(orderRef, { items: updatedItems })
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  const orderRef = doc(db, docs.ORDERS, orderId)
  await updateDoc(orderRef, { status })
}

export const listenOrders = (callback: (orders: TOrderListener[]) => void) => {
  return onSnapshot(collection(db, docs.ORDERS), (orderSnapshot) => {
    const orders: TOrderListener[] = orderSnapshot.docs.map((orderDoc) => {
      const orderData = orderDoc.data() as Omit<TOrderListener, 'id'>
      return { id: orderDoc.id, ...orderData }
    })

    callback(orders)
  })
}

export const listenTableOrders = (tableId: string, callback: (orders: TOrder[]) => void) => {
  const ordersQuery = query(ordersCollection, where('tableId', '==', tableId))

  return onSnapshot(ordersQuery, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TOrder[]
    callback(orders)
  })
}

// Items functions
export const updateItemStatus = async (orderId: string, itemId: string, status: string) => {
  const orderRef = doc(db, docs.ORDERS, orderId)
  const orderSnap = await getDoc(orderRef)

  if (!orderSnap.exists()) {
    // console.warn(`⚠️ Pedido ${orderId} não encontrado!`)
    return
  }

  const orderData = orderSnap.data()
  const updatedItems = orderData.items.map((item: TOrderItem) => (item.id === itemId ? { ...item, status } : item))

  // Verifica se realmente houve alteração antes de atualizar o documento
  if (JSON.stringify(orderData.items) !== JSON.stringify(updatedItems)) {
    await updateDoc(orderRef, { items: updatedItems })
    // console.log(`✅ Item ${itemId} atualizado para ${status} no pedido ${orderId}`)
  } else {
    // console.warn(`⚠️ Nenhuma alteração no status do item ${itemId}`)
  }
}
