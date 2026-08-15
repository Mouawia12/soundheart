import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { HeroBand, Wrap } from '@/features/pages/parts'
import { apiErrorMessage } from '@/lib/api'
import { bookingApi, type Slot } from './bookingApi'

const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export default function BookingPage() {
  const { t, i18n } = useTranslation()
  const locale = (i18n.resolvedLanguage ?? i18n.language ?? 'en').startsWith('ar') ? 'ar' : 'en-US'

  const { data: config } = useQuery({ queryKey: ['booking-config'], queryFn: bookingApi.config })
  const [date, setDate] = useState<string | null>(null)
  const [slot, setSlot] = useState<Slot | null>(null)
  const [step, setStep] = useState<'pick' | 'details' | 'done'>('pick')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [guests, setGuests] = useState<string[]>([])
  const [type, setType] = useState<'online' | 'in_person'>('online')
  const [website, setWebsite] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [returned, setReturned] = useState<'success' | 'cancelled' | null>(null)

  const tz = config?.timezone
  const timeLabel = (iso: string) => new Date(iso).toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit', timeZone: tz })
  const whenLabel = (iso: string) =>
    `${new Date(iso).toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric', timeZone: tz })} · ${timeLabel(iso)}`

  useEffect(() => {
    document.title = 'Book a session | SoundHeart Counseling'
    const status = new URLSearchParams(window.location.search).get('status')
    if (status === 'success') {
      setReturned('success')
      setStep('done')
    } else if (status === 'cancelled') {
      setReturned('cancelled')
    }
  }, [])

  useEffect(() => {
    if (config) setType(config.allowOnline ? 'online' : 'in_person')
  }, [config])

  const dates = useMemo(() => {
    if (!config) return []
    const todayTz = new Date().toLocaleDateString('en-CA', { timeZone: config.timezone })
    const out: string[] = []
    const cursor = new Date(`${todayTz}T12:00:00`)
    for (let i = 0; i < config.maxAdvanceDays && out.length < 21; i++) {
      const iso = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, '0')}-${String(cursor.getDate()).padStart(2, '0')}`
      if (config.openDays.includes(DAY_KEYS[cursor.getDay()])) out.push(iso)
      cursor.setDate(cursor.getDate() + 1)
    }
    return out
  }, [config])

  const { data: slotsData, isFetching: slotsLoading } = useQuery({
    queryKey: ['booking-slots', date],
    queryFn: () => bookingApi.slots(date as string),
    enabled: Boolean(date),
  })

  const pickSlot = (s: Slot) => {
    setSlot(s)
    setStep('details')
    setError('')
  }

  const submit = async () => {
    if (!slot) return
    setError('')
    if (!name.trim()) return setError(t('booking.errName'))
    if (!email.trim()) return setError(t('booking.errEmail'))
    setSubmitting(true)
    try {
      const res = await bookingApi.create({
        name: name.trim(),
        email: email.trim(),
        guests: guests.map((g) => g.trim()).filter(Boolean),
        startsAt: slot.startsAt,
        type,
        website,
      })
      if (res.checkoutUrl) {
        window.location.href = res.checkoutUrl
        return
      }
      setStep('done')
    } catch (e) {
      setError(apiErrorMessage(e, t('booking.errGeneric')))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <HeroBand eyebrow={t('booking.eyebrow')} title={t('booking.title')} lead={t('booking.lead')} />

      <Wrap>
        <div key={step} className="booking-step">
        {step === 'done' ? (
          <div className="mx-auto mt-12 max-w-[640px] rounded-[16px] border border-[#cfe6d4] bg-[#eef7f0] p-10 text-center">
            <p className="m-0 font-serif text-[1.6rem] text-navy">{t('booking.booked')}</p>
            {slot && <p className="mt-2 text-[1.05rem] text-[#4a5550]">{whenLabel(slot.startsAt)}</p>}
            <p className="mt-3 text-[0.95rem] text-[#55606b]">
              {t('booking.confirmationTo')} {email ? <b className="text-navy">{email}</b> : t('booking.yourEmailWord')}
              {guests.filter(Boolean).length ? ` ${t('booking.andGuests')}` : ''}. {t('booking.onlineIncludes')}
            </p>
          </div>
        ) : step === 'pick' ? (
          <div className="mt-10">
            {returned === 'cancelled' && (
              <p className="mb-5 rounded-[8px] border border-[#e9d3ad] bg-[#fff4e8] px-4 py-3 text-[0.9rem] text-[#6b5636]">
                {t('booking.paymentCancelled')}
              </p>
            )}
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {dates.map((d) => {
                const dt = new Date(`${d}T12:00:00`)
                const active = d === date
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => { setDate(d); setSlot(null) }}
                    className={`flex min-w-[74px] flex-none flex-col items-center rounded-[12px] border px-3 py-2.5 transition-colors ${
                      active ? 'border-gold bg-navy text-ivory' : 'border-stone bg-white text-navy hover:border-gold'
                    }`}
                  >
                    <span className="text-[0.72rem] font-bold uppercase tracking-wide opacity-80">{dt.toLocaleDateString(locale, { weekday: 'short' })}</span>
                    <span className="font-serif text-[1.5rem] leading-none">{dt.toLocaleDateString(locale, { day: 'numeric' })}</span>
                    <span className="text-[0.72rem] opacity-80">{dt.toLocaleDateString(locale, { month: 'short' })}</span>
                  </button>
                )
              })}
              {!config && <p className="text-[#59636f]">{t('booking.loadingAvailability')}</p>}
            </div>

            {date && (
              <div className="mt-8">
                <h2 className="mb-3 font-serif text-[1.3rem] font-medium text-navy">{t('booking.availableTimes')}</h2>
                {slotsLoading ? (
                  <p className="text-[#59636f]">{t('booking.loadingTimes')}</p>
                ) : (slotsData?.slots.length ?? 0) === 0 ? (
                  <p className="text-[#59636f]">{t('booking.noTimes')}</p>
                ) : (
                  <div key={date} className="booking-fade grid grid-cols-4 gap-3 max-[640px]:grid-cols-3 max-[420px]:grid-cols-2">
                    {slotsData!.slots.map((s, i) => (
                      <button
                        key={s.startsAt}
                        type="button"
                        disabled={!s.available}
                        onClick={() => pickSlot(s)}
                        style={{ animationDelay: `${Math.min(i * 0.028, 0.36)}s` }}
                        className={`booking-slot rounded-[10px] border-[1.5px] px-2 py-3 text-[0.95rem] font-bold transition-colors ${
                          s.available
                            ? 'border-gold text-navy hover:bg-gold hover:text-navy'
                            : 'cursor-not-allowed border-stone bg-stone/40 text-[#a7ab9f] line-through'
                        }`}
                      >
                        {timeLabel(s.startsAt)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            {!date && config && <p className="mt-8 text-[#59636f]">{t('booking.selectDay')}</p>}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-[640px]">
            <button type="button" onClick={() => setStep('pick')} className="mb-4 text-[0.9rem] font-semibold text-navy hover:text-gold">
              {t('booking.changeTime')}
            </button>
            <div className="rounded-[16px] border border-stone bg-white p-7 max-[560px]:p-5">
              <p className="m-0 text-[0.8rem] font-bold uppercase tracking-wide text-gold">{t('booking.yourSession')}</p>
              <p className="mb-5 mt-1 font-serif text-[1.3rem] text-navy">{slot && whenLabel(slot.startsAt)}</p>

              {config?.allowOnline && config?.allowInPerson && (
                <div className="mb-4 flex gap-2">
                  {(['online', 'in_person'] as const).map((tp) => (
                    <button
                      key={tp}
                      type="button"
                      onClick={() => setType(tp)}
                      className={`rounded-[8px] border-[1.5px] px-4 py-2 text-[0.9rem] font-bold ${
                        type === tp ? 'border-gold bg-navy text-ivory' : 'border-stone text-navy'
                      }`}
                    >
                      {tp === 'online' ? t('booking.online') : t('booking.inPerson')}
                    </button>
                  ))}
                </div>
              )}

              <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} className="hidden" aria-hidden="true" />

              <label className="mb-3 block text-[0.82rem] font-semibold text-navy">
                {t('booking.yourName')}
                <input className="mt-1 w-full rounded-[6px] border-[1.5px] border-stone p-[0.7em_0.9em] focus:border-gold focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label className="mb-3 block text-[0.82rem] font-semibold text-navy">
                {t('booking.yourEmail')}
                <input type="email" className="mt-1 w-full rounded-[6px] border-[1.5px] border-stone p-[0.7em_0.9em] focus:border-gold focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span className="mt-1 block text-[0.75rem] font-normal text-[#8a929c]">{t('booking.emailHint')}</span>
              </label>

              <div className="mb-4">
                <p className="mb-1 text-[0.82rem] font-semibold text-navy">{t('booking.guests')}</p>
                {guests.map((g, i) => (
                  <div key={i} className="mb-2 flex gap-2">
                    <input
                      type="email"
                      placeholder="guest@email.com"
                      className="w-full rounded-[6px] border-[1.5px] border-stone p-[0.6em_0.9em] focus:border-gold focus:outline-none"
                      value={g}
                      onChange={(e) => setGuests((gs) => gs.map((x, idx) => (idx === i ? e.target.value : x)))}
                    />
                    <button type="button" onClick={() => setGuests((gs) => gs.filter((_, idx) => idx !== i))} className="flex-none rounded-md border border-stone px-3 text-[#b3261e] hover:border-[#b3261e]">
                      ✕
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => setGuests((gs) => [...gs, ''])} className="text-[0.85rem] font-semibold text-gold hover:underline">
                  {t('booking.addGuest')}
                </button>
              </div>

              {error && <p className="mb-3 rounded-[6px] bg-[#fdecec] px-3 py-2 text-[0.88rem] text-[#b3261e]">{error}</p>}

              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="w-full rounded-[10px] bg-gold px-6 py-3.5 font-extrabold text-navy transition-colors hover:bg-gold-bright disabled:opacity-60"
              >
                {submitting ? t('booking.submitting') : t('booking.confirm')}
              </button>
            </div>
          </div>
        )}
        </div>
      </Wrap>
    </>
  )
}
