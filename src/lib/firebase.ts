import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth'

/**
 * Firebase client. Config comes from VITE_FIREBASE_* env (baked at build time —
 * these keys are public/safe to ship). When unset, auth simply can't sign in;
 * the public marketing site is unaffected.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
}

export const firebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

let app: FirebaseApp | undefined
let authInstance: Auth | undefined

export function getFirebaseAuth(): Auth {
  if (!authInstance) {
    app = initializeApp(firebaseConfig)
    authInstance = getAuth(app)
  }
  return authInstance
}

export const googleProvider = new GoogleAuthProvider()
