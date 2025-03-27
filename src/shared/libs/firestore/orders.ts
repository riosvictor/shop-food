import { collection, doc, updateDoc, onSnapshot, getDoc, arrayUnion, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { TOrderItem, TOrder, TOrderListener } from '../../types/entities'
import { firebaseDocuments } from '../../helpers/constants'

const ordersCollection = collection(db, firebaseDocuments.ORDERS)

export const addOrderItem = async (orderId: string, newItem: TOrderItem) => {
  const orderRef = doc(db, firebaseDocuments.ORDERS, orderId)

  await updateDoc(orderRef, {
    items: arrayUnion(newItem) // Adiciona o novo item ao array, sem carregar o estado atual
  })
}

export const removeOrderItem = async (orderId: string, itemId: string) => {
  const orderRef = doc(db, firebaseDocuments.ORDERS, orderId)
  const orderSnap = await getDoc(orderRef)

  if (!orderSnap.exists()) return

  const orderData = orderSnap.data()

  const updatedItems = orderData.items.filter((item: TOrderItem) => item.id !== itemId)

  await updateDoc(orderRef, { items: updatedItems })
}

export const updateOrderStatus = async (orderId: string, status: string) => {
  const orderRef = doc(db, firebaseDocuments.ORDERS, orderId)
  await updateDoc(orderRef, { status })
}

export const listenOrders = (callback: (orders: TOrderListener[]) => void) => {
  return onSnapshot(collection(db, firebaseDocuments.ORDERS), (orderSnapshot) => {
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
