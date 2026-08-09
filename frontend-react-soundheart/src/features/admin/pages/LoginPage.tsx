import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'
import { adminApi } from '../api/adminApi'
import { apiErrorMessage } from '@/lib/api'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { token, user } = await adminApi.login(email, password)
      setAuth(token, user)
      navigate('/admin')
    } catch (err) {
      setError(apiErrorMessage(err, 'Sign in failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-6 font-sans"
      style={{ background: 'linear-gradient(160deg,var(--navy-deep),#2E5A44)' }}
    >
      <div className="w-full max-w-[400px] rounded-[14px] bg-ivory p-9 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]">
        <div className="mb-6 flex items-center gap-2">
          <img src="/brand-mark.jpg" alt="" className="h-10 w-auto rounded-[8px]" />
          <span className="font-serif text-[1.3rem] font-semibold text-navy">SoundHeart</span>
        </div>
        <h1 className="mb-1 font-serif text-[1.5rem] font-medium text-navy">Admin sign in</h1>
        <p className="mb-6 text-[0.9rem] text-[#59636f]">Manage articles, categories, and content.</p>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          <label className="text-[0.85rem] font-semibold text-navy">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
              className="mt-1 w-full rounded-[6px] border-[1.5px] border-stone bg-white p-[0.7em_0.9em] text-[0.95rem] focus:border-gold focus:outline-none"
            />
          </label>
          <label className="text-[0.85rem] font-semibold text-navy">
            Password
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-[6px] border-[1.5px] border-stone bg-white p-[0.7em_0.9em] pr-11 text-[0.95rem] focus:border-gold focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8a929c] transition-colors hover:text-navy"
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} className="h-5 w-5 stroke-current">
                    <path d="M3 3l18 18" strokeLinecap="round" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                    <path d="M9.9 5.1A9.5 9.5 0 0 1 12 5c5 0 9 4.5 9 7-.4 1-1.2 2.2-2.4 3.3M6.2 6.2C4 7.6 2.8 9.6 3 12c.4 1 1.2 2.2 2.4 3.3C7.3 17 9.5 19 12 19c1.1 0 2.2-.3 3.2-.8" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} className="h-5 w-5 stroke-current">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {error && (
            <p className="rounded-[6px] bg-[#fdecec] px-3 py-2 text-[0.85rem] text-[#b3261e]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-btn bg-gold px-5 py-3 font-bold text-navy transition-all hover:bg-gold-bright disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
