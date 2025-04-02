import { collection, doc, updateDoc, getDocs, deleteDoc, addDoc } from 'firebase/firestore'
import { TProduct, TProductForm } from '../../types/product'
import { db } from '../../libs/firebase'
import { firebaseDocuments } from '../../helpers/constants'
import { IProductRepository } from './IProductRepository'

export class FirebaseProductRepository implements IProductRepository {
  private productsCollection = collection(db, firebaseDocuments.PRODUCTS)

  async getProducts(): Promise<TProduct[]> {
    const querySnapshot = await getDocs(this.productsCollection)
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as TProduct))
  }

  async deleteProduct(id: string) {
    await deleteDoc(doc(db, firebaseDocuments.PRODUCTS, id))
  }

  async toggleProductAvailability(product: TProduct) {
    await updateDoc(doc(db, firebaseDocuments.PRODUCTS, product.id), { available: !product.available })
  }

  async upsertProduct(product: TProductForm) {
    if (product.id) {
      await updateDoc(doc(db, firebaseDocuments.PRODUCTS, product.id), product)
    } else {
      await addDoc(this.productsCollection, product)
    }
  }
}
