import { useState } from 'react'
import { trpc } from '@/providers/trpc'
import { createStaffLogin, authErrorMessage, resetPassword } from '@/lib/firebaseAuth'

const field = 'bg-white/[0.05] border border-white/[0.1] text-white px-4 py-3 text-sm focus:border-red-600 outline-none'
type Role = 'user' | 'staff' | 'admin'

export default function TeamAdmin({ myId }: { myId: number }) {
  const { data: team = [], refetch } = trpc.team.list.useQuery()
  const register = trpc.team.register.useMutation()
  const setRole = trpc.team.setRole.useMutation({ onSuccess: () => refetch() })
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'staff' as Exclude<Role, 'user'> })
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  async function create(e: React.FormEvent) {
    e.preventDefault()
    setBusy(true); setMsg(null)
    try {
      const idToken = await createStaffLogin(form.email.trim(), form.password, form.name.trim() || undefined)
      await register.mutateAsync({ idToken, name: form.name.trim() || undefined, role: form.role })
      setMsg({ ok: true, text: `Login created for ${form.email}. Share the password with them privately.` })
      setForm({ name: '', email: '', password: '', role: 'staff' })
      refetch()
    } catch (err) {
      const text = (err as { code?: string }).code ? authErrorMessage(err) : (err as Error).message
      setMsg({ ok: false, text })
    } finally {
      setBusy(false)
    }
  }

  async function sendReset(email: string | null) {
    if (!email) return
    try { await resetPassword(email); setMsg({ ok: true, text: `Password reset email sent to ${email}.` }) }
    catch (err) { setMsg({ ok: false, text: authErrorMessage(err) }) }
  }

  return (
    <div>
      <h2 className="text-white font-semibold text-xl mb-4">Team logins ({team.length})</h2>
      <form onSubmit={create} className="mb-6 p-6 bg-white/[0.06] border border-white/[0.18]">
        <h3 className="text-white text-sm mb-1">Create a login</h3>
        <p className="text-white/60 text-xs mb-4">Staff can use Gallery, Enquiries and the logo/image tabs. Admins can also manage logins.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" maxLength={255} className={field} />
          <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className={field} />
          <input type="text" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password (8+ characters)" autoComplete="new-password" className={field} />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as 'staff' | 'admin' })} className={field}>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button disabled={busy} className="mt-4 bg-red-600 hover:bg-red-700 disabled:opacity-40 text-white text-xs font-bold uppercase tracking-[0.07em] px-6 py-3 transition-all">
          {busy ? 'Creating…' : 'Create login'}
        </button>
        {msg && <p className={`mt-4 text-sm ${msg.ok ? 'text-emerald-400' : 'text-red-400'}`} aria-live="polite">{msg.text}</p>}
      </form>

      <div className="space-y-2">
        {team.map((m) => (
          <div key={m.id} className="flex flex-wrap items-center gap-4 p-4 bg-white/[0.06] border border-white/[0.15]">
            <div className="flex-1 min-w-[200px]">
              <p className="text-white font-medium text-sm">{m.name || m.email}{m.id === myId && <span className="text-white/50"> (you)</span>}</p>
              <p className="text-white/60 text-xs">{m.email}</p>
            </div>
            {m.id === myId ? <span className="text-white/60 text-xs uppercase tracking-[0.1em]">{m.role}</span> : (
              <>
                <select value={m.role} onChange={(e) => setRole.mutate({ id: m.id, role: e.target.value as Role })}
                  className="bg-white/[0.05] border border-white/[0.1] text-white px-3 py-2 text-xs" aria-label={`Access for ${m.email}`}>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                  <option value="user">No access</option>
                </select>
                <button onClick={() => sendReset(m.email)} className="text-white/70 hover:text-white text-xs px-3 py-1 border border-white/15">Send password reset</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
