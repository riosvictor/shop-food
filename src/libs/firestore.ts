import {
  collection,
  doc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  where,
  arrayUnion,
  getDoc,
  addDoc
} from 'firebase/firestore'
import { db } from './firebase'
import { TItem, TOrder, TOrderListener, TTable, TTableAdd } from '../types/entities'

const docs = {
  TABLES: 'tables',
  TABLE_ORDERS: (tableId: string) => `tables/${tableId}/orders`
}
const tablesCollection = collection(db, docs.TABLES)

export const getTables = async (): Promise<TTable[]> => {
  const querySnapshot = await getDocs(tablesCollection)
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TTable[]
}

export const addTable = async (table: TTableAdd): Promise<TTable> => {
  const newTable = { status: 'available', orders: [], ...table }
  const docRef = await addDoc(tablesCollection, newTable)
  return { id: docRef.id, ...newTable }
}

export const addOrderItem = async (tableId: string, newItem: TItem) => {
  const orderRef = doc(db, 'orders', tableId)
  await updateDoc(orderRef, {
    items: arrayUnion(newItem) // Adiciona o novo item ao array de items
  })
}

export const removeOrderItem = async (tableId: string, orderId: string, itemId: string) => {
  const orderRef = doc(db, docs.TABLE_ORDERS(tableId), orderId)
  const orderSnap = await getDoc(orderRef)

  if (!orderSnap.exists()) return

  const orderData = orderSnap.data()
  const updatedItems = orderData.items.filter((item: TItem) => item.id !== itemId)

  await updateDoc(orderRef, { items: updatedItems })
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  const orderRef = doc(db, 'orders', orderId)
  await updateDoc(orderRef, { status })
}

export const listenOrders = (callback: (orders: TOrderListener[]) => void) => {
  const unsubscribeTables = onSnapshot(collection(db, docs.TABLES), (tableSnapshot) => {
    const orderListeners: TOrderListener[] = []

    tableSnapshot.docs.forEach((tableDoc) => {
      const tableId = tableDoc.id
      const ordersCollection = collection(db, docs.TABLE_ORDERS(tableId))

      // Agora escutamos os pedidos dentro de cada mesa em tempo real
      const unsubscribeOrders = onSnapshot(ordersCollection, (orderSnapshot) => {
        orderSnapshot.docs.forEach((orderDoc) => {
          const orderData = orderDoc.data() as Omit<TOrder, 'id'> // Garante que o tipo base é TOrder sem o id

          orderListeners.push({
            id: orderDoc.id,
            tableId,
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
  const q = query(collection(db, 'orders'), where('tableId', '==', tableId))
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as TOrder))
    callback(orders)
  })
}
