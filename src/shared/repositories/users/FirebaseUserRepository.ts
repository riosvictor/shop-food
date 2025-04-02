import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../../libs/firebase'
import { firebaseDocuments, userRoles } from '../../helpers/constants'
import { AuthCallback, IUserRepository } from './IUserRepository'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const usersCollection = collection(db, firebaseDocuments.USERS)

export class FirebaseUserRepository implements IUserRepository {
  observeAuthState(callback: AuthCallback) {
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

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async logout(): Promise<void> {
    await signOut(auth)
  }

  async register(email: string, password: string, role = userRoles.WAITER): Promise<void> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const newUser = userCredential.user

    await setDoc(doc(usersCollection, newUser.uid), {
      email: newUser.email,
      role
    })
  }
}
