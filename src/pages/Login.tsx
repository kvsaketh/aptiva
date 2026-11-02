import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Aurora, Grain } from '@/components/motion/Atmosphere'
import KineticBackdrop from '@/components/kit/KineticBackdrop'
import { IconArrowRight } from '@/components/Icons'
import { firebaseConfigured } from '@/lib/firebase'
import { signInEmail, resetPassword, authErrorMessage } from '@/lib/firebaseAuth'

export default function Login() {
  const navigate = useNavigate()
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
      await signInEmail(email, password)
      go()
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
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
            <h1 className="display-3 mt-3 text-white">Welcome back</h1>
            <p className="mt-2 text-[14px] leading-relaxed text-white/55">
              Sign in to the Aptiva console. Logins are created by an admin.
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
            <input className={field} type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            <input className={field} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required minLength={6} />

            <button type="button" onClick={handleReset} className="block text-right text-[12px] text-white/45 transition-colors hover:text-white">
              Forgot password?
            </button>

            <button type="submit" disabled={busy || !firebaseConfigured} className="btn-primary-blue group w-full disabled:cursor-not-allowed disabled:opacity-50">
              <span>{busy ? 'Please wait…' : 'Sign in'}</span>
              <IconArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>

        </div>
      </div>
    </section>
  )
}
