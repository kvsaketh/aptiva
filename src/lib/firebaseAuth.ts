import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  getAuth,
  type User,
} from 'firebase/auth'
import { initializeApp, deleteApp } from 'firebase/app'
import { getFirebaseAuth, firebaseConfig } from './firebase'

/** Map Firebase's error codes to friendly messages. */
export function authErrorMessage(e: unknown): string {
  const code = (e as { code?: string })?.code ?? ''
  const map: Record<string, string> = {
    'auth/invalid-email': 'That email address looks invalid.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect email or password.',
    'auth/invalid-credential': 'Incorrect email or password.',
    'auth/email-already-in-use': 'An account with that email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled in Firebase.',
    'auth/invalid-api-key': 'Firebase is not configured yet.',
    'auth/configuration-not-found': 'Firebase auth is not configured for this domain.',
  }
  return map[code] ?? 'Something went wrong. Please try again.'
}

export async function signInEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(getFirebaseAuth(), email, password)
  return cred.user
}

// Creates a staff login from the admin's browser. A separate Firebase app instance
// is used so the admin stays signed in. Returns the new account's ID token.
export async function createStaffLogin(email: string, password: string, name?: string) {
  const app = initializeApp(firebaseConfig, `staff-${Date.now()}`)
  try {
    const auth = getAuth(app)
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) await updateProfile(cred.user, { displayName: name })
    const token = await cred.user.getIdToken(true)
    await signOut(auth)
    return token
  } finally {
    await deleteApp(app)
  }
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(getFirebaseAuth(), email)
}

export async function logOut() {
  await signOut(getFirebaseAuth())
}

/** Current Firebase ID token (auto-refreshed by the SDK), or null. */
export async function currentIdToken(): Promise<string | null> {
  // Auth misconfigured or unavailable → anonymous request, so public pages keep working.
  try {
    const u: User | null = getFirebaseAuth().currentUser
    return u ? await u.getIdToken() : null
  } catch {
    return null
  }
}
