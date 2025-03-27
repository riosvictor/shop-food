import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { firebaseDocuments } from '../../helpers/constants'
import { TProduct, TProductForm } from '../../types/product'

const productsCollection = collection(db, firebaseDocuments.PRODUCTS)

export const getProducts = async (): Promise<TProduct[]> => {
  const querySnapshot = await getDocs(productsCollection)
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TProduct))
}

export const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, firebaseDocuments.PRODUCTS, id))
}

export const toggleProductAvailability = async (product: TProduct) => {
  await updateDoc(doc(db, firebaseDocuments.PRODUCTS, product.id), { available: !product.available })
}

export const upsertProduct = async (product: TProductForm) => {
  if (product.id) {
    await updateDoc(doc(db, firebaseDocuments.PRODUCTS, product.id), product)
  } else {
    await addDoc(productsCollection, product)
  }
}
