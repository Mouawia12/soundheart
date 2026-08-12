import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminApi } from '../api/adminApi'
import { apiErrorMessage } from '@/lib/api'
import type { SiteSettings } from '@/features/site/useSettings'

const inputCls =
  'w-full rounded-[6px] border-[1.5px] border-stone bg-white p-[0.6em_0.8em] text-[0.95rem] focus:border-gold focus:outline-none'

function Field({
  label,
  value,
  onChange,
  hint,
  placeholder,
  textarea,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  hint?: string
  placeholder?: string
  textarea?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.82rem] font-semibold text-navy">{label}</span>
      {textarea ? (
        <textarea className={inputCls} rows={2} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={inputCls} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <span className="mt-1 block text-[0.75rem] text-[#8a929c]">{hint}</span>}
    </label>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6 rounded-[12px] border border-stone bg-white p-5">
      <h2 className="mb-4 font-serif text-[1.15rem] font-medium text-navy">{title}</h2>
      <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">{children}</div>
    </section>
  )
}

function EyeIcon({ off }: { off: boolean }) {
  return off ? (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} className="h-5 w-5 stroke-current">
      <path d="M3 3l18 18" strokeLinecap="round" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path
        d="M9.9 5.1A9.5 9.5 0 0 1 12 5c5 0 9 4.5 9 7-.4 1-1.2 2.2-2.4 3.3M6.2 6.2C4 7.6 2.8 9.6 3 12c.4 1 1.2 2.2 2.4 3.3C7.3 17 9.5 19 12 19c1.1 0 2.2-.3 3.2-.8"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.7} className="h-5 w-5 stroke-current">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function PasswordInput({
  label,
  value,
  onChange,
  hint,
  autoComplete,
  state = 'idle',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  hint?: React.ReactNode
  autoComplete?: string
  state?: 'idle' | 'good' | 'bad'
}) {
  const [show, setShow] = useState(false)
  const border =
    state === 'good'
      ? 'border-[#79b58f] focus:border-[#2e5a44]'
      : state === 'bad'
        ? 'border-[#e0a3a3] focus:border-[#b3261e]'
        : 'border-stone focus:border-gold'

  return (
    <label className="block">
      <span className="mb-1 block text-[0.82rem] font-semibold text-navy">{label}</span>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className={`w-full rounded-[6px] border-[1.5px] ${border} bg-white p-[0.6em_0.8em] pr-11 text-[0.95rem] focus:outline-none`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-[#8a929c] transition-colors hover:text-navy"
        >
          <EyeIcon off={show} />
        </button>
      </div>
      {hint && <span className="mt-1 block text-[0.75rem]">{hint}</span>}
    </label>
  )
}

function PasswordSection() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const longEnough = next.length >= 8
  const matchState: 'idle' | 'good' | 'bad' =
    confirm.length === 0 ? 'idle' : next === confirm ? 'good' : 'bad'
  const canSubmit = current.length > 0 && longEnough && matchState === 'good'

  const save = useMutation({
    mutationFn: () => adminApi.updatePassword(current, next, confirm),
    onSuccess: () => {
      setSaved(true)
      setError('')
      setCurrent('')
      setNext('')
      setConfirm('')
      setTimeout(() => setSaved(false), 3000)
    },
    onError: (e) => setError(apiErrorMessage(e, 'Could not update password')),
  })

  const submit = () => {
    setError('')
    if (!longEnough) return setError('New password must be at least 8 characters.')
    if (next !== confirm) return setError('New password and confirmation do not match.')
    save.mutate()
  }

  return (
    <section className="mb-6 rounded-[12px] border border-stone bg-white p-5">
      <h2 className="mb-4 font-serif text-[1.15rem] font-medium text-navy">Change password</h2>
      <div className="grid grid-cols-2 gap-4 max-[720px]:grid-cols-1">
        <PasswordInput label="Current password" value={current} onChange={setCurrent} autoComplete="current-password" />
        <div className="max-[720px]:hidden" />
        <PasswordInput
          label="New password"
          value={next}
          onChange={setNext}
          autoComplete="new-password"
          state={next.length > 0 && longEnough ? 'good' : 'idle'}
          hint={
            next.length === 0 ? (
              <span className="text-[#8a929c]">At least 8 characters.</span>
            ) : longEnough ? (
              <span className="font-semibold text-[#2e5a44]">✓ Long enough ({next.length} characters)</span>
            ) : (
              <span className="text-[#8a929c]">{next.length} / 8 characters</span>
            )
          }
        />
        <PasswordInput
          label="Confirm new password"
          value={confirm}
          onChange={setConfirm}
          autoComplete="new-password"
          state={matchState}
          hint={
            confirm.length === 0 ? undefined : matchState === 'good' ? (
              <span className="font-semibold text-[#2e5a44]">✓ Passwords match</span>
            ) : (
              <span className="font-semibold text-[#b3261e]">✕ Passwords do not match</span>
            )
          }
        />
      </div>
      {error && <p className="mt-3 rounded-[6px] bg-[#fdecec] px-3 py-2 text-[0.85rem] text-[#b3261e]">{error}</p>}
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={submit}
          disabled={save.isPending || !canSubmit}
          className="rounded-btn border-[1.5px] border-gold px-5 py-2 font-bold text-navy transition-colors hover:bg-[rgba(184,150,79,0.1)] disabled:opacity-50"
        >
          {save.isPending ? 'Updating…' : 'Update password'}
        </button>
        {saved && <span className="text-[0.9rem] font-semibold text-[#2e5a44]">Password updated ✓</span>}
      </div>
    </section>
  )
}

export default function SettingsPage() {
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey: ['admin-settings'], queryFn: adminApi.settings })
  const [form, setForm] = useState<SiteSettings>({})
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  const save = useMutation({
    mutationFn: () => adminApi.updateSettings(form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['settings'] })
      qc.invalidateQueries({ queryKey: ['admin-settings'] })
      setSaved(true)
      setError('')
      setTimeout(() => setSaved(false), 2500)
    },
    onError: (e) => setError(apiErrorMessage(e, 'Save failed')),
  })

  const set = (k: keyof SiteSettings, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const setSocial = (k: string, v: string) => setForm((f) => ({ ...f, social: { ...f.social, [k]: v } }))

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h1 className="m-0 font-serif text-[1.8rem] font-medium text-navy">Site settings</h1>
      </div>
      <p className="mb-6 text-[0.95rem] text-[#59636f]">
        Contact details and links used across the whole site, the footer, the floating buttons, and the contact page.
      </p>

      <Group title="Brand">
        <Field label="Brand name" value={form.brandName ?? ''} onChange={(v) => set('brandName', v)} />
        <Field label="Legal name" value={form.legalName ?? ''} onChange={(v) => set('legalName', v)} />
        <Field label="Tagline / signature" value={form.signature ?? ''} onChange={(v) => set('signature', v)} textarea />
      </Group>

      <Group title="Contact">
        <Field label="Phone (displayed)" value={form.phoneDisplay ?? ''} onChange={(v) => set('phoneDisplay', v)} placeholder="907-310-1404" />
        <Field label="Phone (dial number)" value={form.phoneNumber ?? ''} onChange={(v) => set('phoneNumber', v)} hint="Digits only, with country code — e.g. 19073101404" placeholder="19073101404" />
        <Field label="Email" value={form.email ?? ''} onChange={(v) => set('email', v)} placeholder="hello@soundheart.org" />
        <Field label="WhatsApp number" value={form.whatsappNumber ?? ''} onChange={(v) => set('whatsappNumber', v)} hint="Digits only, with country code" placeholder="19073101404" />
        <Field label="Location / address" value={form.address ?? ''} onChange={(v) => set('address', v)} />
        <Field label="Hours" value={form.hours ?? ''} onChange={(v) => set('hours', v)} />
        <Field label="Booking link (SimplePractice)" value={form.bookingUrl ?? ''} onChange={(v) => set('bookingUrl', v)} placeholder="https://…" />
        <Field label="Client Login (portal) URL" value={form.clientPortalUrl ?? ''} onChange={(v) => set('clientPortalUrl', v)} hint="The client portal / login link in the header" placeholder="https://…" />
        <Field label="Crisis note" value={form.crisisNote ?? ''} onChange={(v) => set('crisisNote', v)} textarea />
      </Group>

      <Group title="Social links (optional)">
        <Field label="Facebook URL" value={form.social?.facebook ?? ''} onChange={(v) => setSocial('facebook', v)} placeholder="https://facebook.com/…" />
        <Field label="Instagram URL" value={form.social?.instagram ?? ''} onChange={(v) => setSocial('instagram', v)} placeholder="https://instagram.com/…" />
        <Field label="LinkedIn URL" value={form.social?.linkedin ?? ''} onChange={(v) => setSocial('linkedin', v)} placeholder="https://linkedin.com/…" />
        <Field label="YouTube URL" value={form.social?.youtube ?? ''} onChange={(v) => setSocial('youtube', v)} placeholder="https://youtube.com/…" />
      </Group>

      {error && <p className="mb-3 rounded-[6px] bg-[#fdecec] px-3 py-2 text-[0.88rem] text-[#b3261e]">{error}</p>}

      <div className="mb-8 flex items-center gap-3">
        <button
          type="button"
          onClick={() => save.mutate()}
          disabled={save.isPending}
          className="rounded-btn bg-gold px-6 py-2.5 font-bold text-navy hover:bg-gold-bright disabled:opacity-60"
        >
          {save.isPending ? 'Saving…' : 'Save changes'}
        </button>
        {saved && <span className="text-[0.9rem] font-semibold text-[#2e5a44]">Saved ✓</span>}
      </div>

      <div className="mb-4 border-t border-stone pt-6">
        <h2 className="mb-1 font-serif text-[1.4rem] font-medium text-navy">Account</h2>
        <p className="mb-4 text-[0.9rem] text-[#59636f]">
          Change the password you use to sign in to the dashboard. Other devices will be signed out.
        </p>
      </div>
      <PasswordSection />
    </div>
  )
}
