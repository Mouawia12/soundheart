import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useClientAuth } from '@/store/clientAuth'
import { apiErrorMessage } from '@/lib/api'
import { BrandMark } from '@/components/layout/Header'
import { portalApi } from './portalApi'
import GoogleSignInButton from './GoogleSignInButton'

const inputCls =
  'mt-1 w-full rounded-[6px] border-[1.5px] border-stone bg-white p-[0.7em_0.9em] text-[0.95rem] focus:border-gold focus:outline-none'

export default function PortalAuthPage({ mode: initial = 'login' }: { mode?: 'login' | 'register' }) {
  const [mode, setMode] = useState<'login' | 'register'>(initial)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const setAuth = useClientAuth((s) => s.setAuth)
  const alreadyAuthed = useClientAuth((s) => Boolean(s.token))
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Client portal | SoundHeart Counseling'
  }, [])

  if (alreadyAuthed) return <Navigate to="/portal" replace />

  const onGoogle = async (credential: string) => {
    setError('')
    setLoading(true)
    try {
      const { token, user } = await portalApi.google(credential)
      setAuth(token, user)
      navigate('/portal')
    } catch (e) {
      setError(apiErrorMessage(e, 'Google sign-in failed'))
    } finally {
      setLoading(false)
    }
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (mode === 'register' && password !== confirm) return setError('Passwords do not match.')
    setLoading(true)
    try {
      const res =
        mode === 'login'
          ? await portalApi.login(email, password)
          : await portalApi.register(name, email, password, confirm)
      setAuth(res.token, res.user)
      navigate('/portal')
    } catch (err) {
      setError(apiErrorMessage(err, mode === 'login' ? 'Sign in failed' : 'Could not create your account'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 font-sans" style={{ background: 'linear-gradient(160deg,var(--navy-deep),#2E5A44)' }}>
      <div className="w-full max-w-[420px] rounded-[14px] bg-ivory p-9 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
        <Link to="/" className="mb-5 flex items-center gap-2 no-underline">
          <BrandMark />
          <span className="font-serif text-[1.25rem] font-semibold text-navy">SoundHeart</span>
        </Link>
        <h1 className="mb-1 font-serif text-[1.5rem] font-medium text-navy">
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mb-6 text-[0.9rem] text-[#59636f]">
          {mode === 'login' ? 'Sign in to your SoundHeart client portal.' : 'Set up your client portal to manage sessions and intake forms.'}
        </p>

        <GoogleSignInButton onCredential={onGoogle} />

        <form onSubmit={submit} className="flex flex-col gap-3">
          {mode === 'register' && (
            <label className="text-[0.85rem] font-semibold text-navy">
              Full name
              <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            </label>
          )}
          <label className="text-[0.85rem] font-semibold text-navy">
            Email
            <input type="email" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </label>
          <label className="text-[0.85rem] font-semibold text-navy">
            Password
            <input type={show ? 'text' : 'password'} className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
          </label>
          {mode === 'register' && (
            <label className="text-[0.85rem] font-semibold text-navy">
              Confirm password
              <input type={show ? 'text' : 'password'} className={inputCls} value={confirm} onChange={(e) => setConfirm(e.target.value)} required autoComplete="new-password" />
            </label>
          )}
          <label className="flex items-center gap-2 text-[0.8rem] font-medium text-[#59636f]">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
            Show password
          </label>

          {error && <p className="rounded-[6px] bg-[#fdecec] px-3 py-2 text-[0.85rem] text-[#b3261e]">{error}</p>}

          <button type="submit" disabled={loading} className="mt-1 rounded-btn bg-gold px-5 py-3 font-bold text-navy transition-all hover:bg-gold-bright disabled:opacity-60">
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="mt-5 text-center text-[0.88rem] text-[#59636f]">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }} className="font-bold text-navy hover:text-gold">
            {mode === 'login' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
