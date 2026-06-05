import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Aurora, Grain } from '@/components/motion/Atmosphere'
import KineticBackdrop from '@/components/kit/KineticBackdrop'
import { IconArrowRight } from '@/components/Icons'
import { firebaseConfigured } from '@/lib/firebase'
import { signInEmail, signUpEmail, signInGoogle, resetPassword, authErrorMessage } from '@/lib/firebaseAuth'

type Mode = 'signin' | 'signup'

export default function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const go = () => navigate('/admin')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null); setNotice(null); setBusy(true)
    try {
      if (mode === 'signin') {
        await signInEmail(email, password)
        go()
      } else {
        await signUpEmail(email, password, name || undefined)
        setNotice('Account created — a verification email is on its way. Redirecting…')
        setTimeout(go, 1200)
      }
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function handleGoogle() {
    setError(null); setNotice(null); setBusy(true)
    try { await signInGoogle(); go() }
    catch (err) { setError(authErrorMessage(err)) }
    finally { setBusy(false) }
  }

  async function handleReset() {
    if (!email) { setError('Enter your email first, then tap reset.'); return }
    setError(null); setBusy(true)
    try { await resetPassword(email); setNotice('Password reset email sent.') }
    catch (err) { setError(authErrorMessage(err)) }
    finally { setBusy(false) }
  }

  const field = 'w-full border border-white/12 bg-white/[0.04] px-4 py-3 text-[14.5px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-brand-blue/60 focus:bg-white/[0.06]'

  return (
    <section className="surface-ink-raised grain relative flex min-h-[88vh] items-center justify-center overflow-hidden py-20">
      <Aurora />
      <KineticBackdrop variant="rings" color="blue" opacity={0.32} className="left-1/2 w-[120%] -translate-x-1/2" />
      <Grain />

      <div className="container-xl relative z-10 flex justify-center">
        <div className="border-gradient-blue w-full max-w-md border border-white/10 bg-ink-900/75 p-8 backdrop-blur-xl md:p-10">
          <img src="/logo-dark-bg.png" alt="Aptiva Technologies" className="mx-auto h-[2.65rem] w-auto object-contain" />

          <div className="mt-7 text-center">
            <span className="eyebrow-blue justify-center">Secure access</span>
            <h1 className="display-3 mt-3 text-white">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-white/55">
              {mode === 'signin' ? 'Sign in to the Aptiva console.' : 'Register to request access to the console.'}
            </p>
          </div>

          {!firebaseConfigured && (
            <p className="mt-6 border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-[12.5px] leading-relaxed text-amber-200">
              Sign-in isn't configured yet — set the <code className="font-mono">VITE_FIREBASE_*</code> values and rebuild. See <code className="font-mono">deploy/FIREBASE.md</code>.
            </p>
          )}

          {error && <p className="mt-6 border border-red-500/30 bg-red-500/10 px-4 py-3 text-[12.5px] text-red-200">{error}</p>}
          {notice && <p className="mt-6 border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-[12.5px] text-emerald-200">{notice}</p>}

          <form onSubmit={handleSubmit} className="mt-7 space-y-3">
            {mode === 'signup' && (
              <input className={field} type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            )}
            <input className={field} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            <input className={field} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} required minLength={6} />

            {mode === 'signin' && (
              <button type="button" onClick={handleReset} className="block text-right text-[12px] text-white/45 transition-colors hover:text-white">
                Forgot password?
              </button>
            )}

            <button type="submit" disabled={busy || !firebaseConfigured} className="btn-primary-blue group w-full disabled:cursor-not-allowed disabled:opacity-50">
              <span>{busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}</span>
              <IconArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/35">or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <button onClick={handleGoogle} disabled={busy || !firebaseConfigured} className="flex w-full items-center justify-center gap-3 border border-white/15 bg-white/[0.04] px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:border-white/40 hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50">
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden>
              <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.42-.96 2.62-2.04 3.43v2.85h3.3c1.93-1.78 3.04-4.4 3.04-7.52 0-.7-.06-1.37-.18-2.02H12z" />
              <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.3-2.85c-.92.62-2.1.98-3.32.98-2.55 0-4.71-1.72-5.48-4.04H3.1v2.94C4.75 19.92 8.1 22 12 22z" />
              <path fill="#FBBC05" d="M6.52 13.67c-.2-.6-.31-1.23-.31-1.87s.11-1.27.31-1.87V6.99H3.1A9.97 9.97 0 0 0 2 12c0 1.6.38 3.12 1.1 4.46l3.42-2.79z" />
              <path fill="#4285F4" d="M12 6.58c1.47 0 2.79.51 3.83 1.5l2.87-2.87C16.95 3.6 14.7 2.7 12 2.7 8.1 2.7 4.75 4.78 3.1 7.99l3.42 2.94C7.29 8.3 9.45 6.58 12 6.58z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-7 text-center text-[13px] text-white/50">
            {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); setNotice(null) }} className="font-semibold text-white underline-offset-2 hover:underline">
              {mode === 'signin' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
