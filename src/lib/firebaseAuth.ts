import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import { getFirebaseAuth, googleProvider } from './firebase'

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
    'auth/popup-closed-by-user': 'Sign-in was cancelled.',
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

export async function signUpEmail(email: string, password: string, name?: string) {
  const cred = await createUserWithEmailAndPassword(getFirebaseAuth(), email, password)
  if (name) await updateProfile(cred.user, { displayName: name })
  // Fire-and-forget verification email (Firebase handles delivery).
  void sendEmailVerification(cred.user).catch(() => {})
  return cred.user
}

export async function signInGoogle() {
  const cred = await signInWithPopup(getFirebaseAuth(), googleProvider)
  return cred.user
}

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(getFirebaseAuth(), email)
}

export async function logOut() {
  await signOut(getFirebaseAuth())
}

/** Current Firebase ID token (auto-refreshed by the SDK), or null. */
export async function currentIdToken(): Promise<string | null> {
  const u: User | null = getFirebaseAuth().currentUser
  if (!u) return null
  try {
    return await u.getIdToken()
  } catch {
    return null
  }
}
