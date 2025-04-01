import { collection, doc, updateDoc, onSnapshot, getDoc, arrayUnion, query, where } from 'firebase/firestore'
import { db } from '../libs/firebase'
import { IOrderRepository } from './IOrderRepository'
import { TOrder, TOrderItem, TOrderListener } from '../types'
import { firebaseDocuments } from '../helpers/constants'

export class FirebaseOrderRepository implements IOrderRepository {
  private ordersCollection = collection(db, firebaseDocuments.ORDERS)

  async addOrderItem(orderId: string, newItems: TOrderItem[]): Promise<void> {
    const orderRef = doc(db, firebaseDocuments.ORDERS, orderId)
    await updateDoc(orderRef, { items: arrayUnion(...newItems) })
  }

  async removeOrderItem(orderId: string, itemId: string): Promise<void> {
    const orderRef = doc(db, firebaseDocuments.ORDERS, orderId)
    const orderSnap = await getDoc(orderRef)
    if (!orderSnap.exists()) return
    const orderData = orderSnap.data()
    const updatedItems = orderData.items.filter((item: TOrderItem) => item.id !== itemId)
    await updateDoc(orderRef, { items: updatedItems })
  }

  async updateItemStatus(orderId: string, itemId: string, status: string): Promise<void> {
    const orderRef = doc(db, firebaseDocuments.ORDERS, orderId)
    const orderSnap = await getDoc(orderRef)

    if (!orderSnap.exists()) {
      console.warn(`⚠️ Pedido ${orderId} não encontrado!`)
      return
    }

    const orderData = orderSnap.data()
    const updatedItems = orderData.items.map((item: TOrderItem) => (item.id === itemId ? { ...item, status } : item))

    // Verifica se realmente houve alteração antes de atualizar o documento
    if (JSON.stringify(orderData.items) !== JSON.stringify(updatedItems)) {
      await updateDoc(orderRef, { items: updatedItems })
      console.log(`✅ Item ${itemId} atualizado para ${status} no pedido ${orderId}`)
    } else {
      console.warn(`⚠️ Nenhuma alteração no status do item ${itemId}`)
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<void> {
    const orderRef = doc(db, firebaseDocuments.ORDERS, orderId)
    await updateDoc(orderRef, { status })
  }

  listenOrders(callback: (orders: TOrderListener[]) => void): () => void {
    return onSnapshot(this.ordersCollection, (orderSnapshot) => {
      const orders: TOrderListener[] = orderSnapshot.docs.map((orderDoc) => {
        const orderData = orderDoc.data() as Omit<TOrderListener, 'id'>
        return { id: orderDoc.id, ...orderData }
      })
      callback(orders)
    })
  }

  listenTableOrders(tableId: string, callback: (orders: TOrder[]) => void): () => void {
    const ordersQuery = query(this.ordersCollection, where('tableId', '==', tableId))
    return onSnapshot(ordersQuery, (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TOrder[]
      callback(orders)
    })
  }
}
