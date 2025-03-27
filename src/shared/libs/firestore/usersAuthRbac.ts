import { auth, db } from '../firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { firebaseDocuments, userRoles } from '../../helpers/constants'
import { AuthUser } from '../../types/entities'

const usersCollection = collection(db, firebaseDocuments.USERS)

type AuthCallback = (user: AuthUser | null) => void

export const observeAuthState = (callback: AuthCallback) => {
  return onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const userRef = doc(usersCollection, currentUser.uid)
      const userSnap = await getDoc(userRef)
      const role = userSnap.exists() ? userSnap.data().role : userRoles.WAITER // rever isso no futuro
      callback({ ...currentUser, role })
    } else {
      callback(null)
    }
  })
}

export const login = async (email: string, password: string): Promise<void> => {
  await signInWithEmailAndPassword(auth, email, password)
}

export const logout = async (): Promise<void> => {
  await signOut(auth)
}

export const register = async (email: string, password: string, role = userRoles.WAITER): Promise<void> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password)
  const newUser = userCredential.user

  await setDoc(doc(usersCollection, newUser.uid), {
    email: newUser.email,
    role
  })
}
