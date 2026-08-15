import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { bookingApi, type BookingSettings, type Window } from '@/features/booking/bookingApi'
import { apiErrorMessage } from '@/lib/api'

const DAYS: { key: string; label: string }[] = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
  { key: 'sat', label: 'Saturday' },
  { key: 'sun', label: 'Sunday' },
]

const TIMEZONES = ['America/Anchorage', 'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York', 'UTC']

const inputCls = 'rounded-[6px] border-[1.5px] border-stone bg-white p-[0.5em_0.7em] text-[0.95rem] focus:border-gold focus:outline-none'

function NumField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (n: number) => void; suffix?: string }) {
  return (
    <label className="block text-[0.82rem] font-semibold text-navy">
      {label}
      <div className="mt-1 flex items-center gap-2">
        <input type="number" className={`${inputCls} w-24`} value={value} onChange={(e) => onChange(Number(e.target.value))} />
        {suffix && <span className="text-[0.85rem] font-normal text-[#59636f]">{suffix}</span>}
      </div>
    </label>
  )
}

export default function BookingSettingsPage() {
  const qc = useQueryClient()
  const { data } = useQuery({ queryKey: ['admin-booking-settings'], queryFn: bookingApi.settings })
  const [form, setForm] = useState<BookingSettings>({})
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (data) setForm(data)
  }, [data])

  const save = useMutation({
    mutationFn: () => bookingApi.updateSettings(form),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-booking-settings'] })
      qc.invalidateQueries({ queryKey: ['booking-config'] })
      setSaved(true)
      setError('')
      setTimeout(() => setSaved(false), 2500)
    },
    onError: (e) => setError(apiErrorMessage(e, 'Save failed')),
  })

  const hours = form.hours ?? {}
  const set = <K extends keyof BookingSettings>(k: K, v: BookingSettings[K]) => setForm((f) => ({ ...f, [k]: v }))
  const setDay = (day: string, windows: Window[]) => setForm((f) => ({ ...f, hours: { ...f.hours, [day]: windows } }))

  return (
    <div>
      <h1 className="mb-2 font-serif text-[1.8rem] font-medium text-navy">Booking settings</h1>
      <p className="mb-6 text-[0.95rem] text-[#59636f]">
        Set your working hours, session length, and options. The public booking page builds its time slots from this.
      </p>

      {/* Working hours */}
      <section className="mb-6 rounded-[12px] border border-stone bg-white p-5">
        <h2 className="mb-4 font-serif text-[1.15rem] font-medium text-navy">Working hours</h2>
        <div className="flex flex-col gap-2.5">
          {DAYS.map((d) => {
            const win = hours[d.key]?.[0]
            const open = (hours[d.key]?.length ?? 0) > 0
            return (
              <div key={d.key} className="flex items-center gap-4 rounded-[8px] bg-ivory px-4 py-2.5 max-[560px]:flex-wrap">
                <label className="flex w-[130px] items-center gap-2 font-semibold text-navy">
                  <input type="checkbox" checked={open} onChange={(e) => setDay(d.key, e.target.checked ? [{ start: '09:00', end: '17:00' }] : [])} />
                  {d.label}
                </label>
                {open ? (
                  <div className="flex items-center gap-2">
                    <input type="time" className={inputCls} value={win?.start ?? '09:00'} onChange={(e) => setDay(d.key, [{ start: e.target.value, end: win?.end ?? '17:00' }])} />
                    <span className="text-[#59636f]">to</span>
                    <input type="time" className={inputCls} value={win?.end ?? '17:00'} onChange={(e) => setDay(d.key, [{ start: win?.start ?? '09:00', end: e.target.value }])} />
                  </div>
                ) : (
                  <span className="text-[0.9rem] text-[#8a929c]">Closed</span>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* Session rules */}
      <section className="mb-6 rounded-[12px] border border-stone bg-white p-5">
        <h2 className="mb-4 font-serif text-[1.15rem] font-medium text-navy">Session</h2>
        <div className="grid grid-cols-3 gap-5 max-[720px]:grid-cols-2 max-[480px]:grid-cols-1">
          <NumField label="Session length" value={form.sessionMinutes ?? 50} onChange={(n) => set('sessionMinutes', n)} suffix="minutes" />
          <NumField label="Buffer between sessions" value={form.bufferMinutes ?? 0} onChange={(n) => set('bufferMinutes', n)} suffix="minutes" />
          <NumField label="Minimum notice" value={form.leadTimeHours ?? 0} onChange={(n) => set('leadTimeHours', n)} suffix="hours" />
          <NumField label="Book up to" value={form.maxAdvanceDays ?? 60} onChange={(n) => set('maxAdvanceDays', n)} suffix="days ahead" />
          <NumField label="Price" value={form.price ?? 0} onChange={(n) => set('price', n)} suffix={form.currency ?? 'USD'} />
          <label className="block text-[0.82rem] font-semibold text-navy">
            Timezone
            <select className={`${inputCls} mt-1 block w-full`} value={form.timezone ?? 'America/Anchorage'} onChange={(e) => set('timezone', e.target.value)}>
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 flex gap-6">
          <label className="flex items-center gap-2 text-[0.9rem] font-semibold text-navy">
            <input type="checkbox" checked={form.allowOnline ?? true} onChange={(e) => set('allowOnline', e.target.checked)} />
            Offer online sessions
          </label>
          <label className="flex items-center gap-2 text-[0.9rem] font-semibold text-navy">
            <input type="checkbox" checked={form.allowInPerson ?? true} onChange={(e) => set('allowInPerson', e.target.checked)} />
            Offer in-person sessions
          </label>
        </div>
      </section>

      {error && <p className="mb-3 rounded-[6px] bg-[#fdecec] px-3 py-2 text-[0.88rem] text-[#b3261e]">{error}</p>}
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => save.mutate()} disabled={save.isPending} className="rounded-btn bg-gold px-6 py-2.5 font-bold text-navy hover:bg-gold-bright disabled:opacity-60">
          {save.isPending ? 'Saving…' : 'Save changes'}
        </button>
        {saved && <span className="text-[0.9rem] font-semibold text-[#2e5a44]">Saved ✓</span>}
      </div>
    </div>
  )
}
