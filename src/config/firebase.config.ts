import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAyeiiCecHPkSMjRdbs-vIzpWhr8dinO_A',
  authDomain: 'club-ecommerce-8f3f4.firebaseapp.com',
  projectId: 'club-ecommerce-8f3f4',
  storageBucket: 'club-ecommerce-8f3f4.firebasestorage.app',
  messagingSenderId: '323673532964',
  appId: '1:323673532964:web:05d5690350a7a5fc1b46b1'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
