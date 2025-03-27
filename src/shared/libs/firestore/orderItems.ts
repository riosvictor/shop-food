import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { TOrderItem } from '../../types/entities'
import { firebaseDocuments } from '../../helpers/constants'

export const updateItemStatus = async (orderId: string, itemId: string, status: string) => {
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
