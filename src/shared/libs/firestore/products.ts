import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { firebaseDocuments } from '../../helpers/constants'
import { TProduct } from '../../types/product'

const productsCollection = collection(db, firebaseDocuments.PRODUCTS)

export const getAvailableProducts = async (): Promise<TProduct[]> => {
  const querySnapshot = await getDocs(productsCollection)
  return querySnapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() } as TProduct))
    .filter((product) => product.available)
}
