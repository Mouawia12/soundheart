import { useEffect, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { apiPost, apiErrorMessage } from '@/lib/api'
import { site } from '@/config/site'
import { HeroBand, ImgPh } from './parts'
import { usePage, pageImage, pageText, pageHtml } from '@/features/site/usePage'

const steps = [
  {
    title: 'Book a consultation',
    body: 'Choose a time and reserve it in a few simple steps. This first conversation helps us understand what you need and whether we are a good fit.',
  },
  {
    title: 'Complete a short intake',
    body: 'Before your first full session, you will fill out secure intake forms in our private client portal, so we can make the most of your time.',
  },
  {
    title: 'Begin the work',
    body: 'We meet, in person in the Mat-Su Valley or online where available, and build a plan together, at your pace.',
  },
]

const fees = [
  'SoundHeart is a private-pay practice. Being private pay keeps your care confidential and fully focused on you rather than on insurance requirements.',
  'Different kinds of work carry different investment levels. A consultation, ongoing counseling or coaching, intensives, and retreats are each priced for what they involve.',
  'We believe in being open about cost, and we will always talk it through with you honestly before you commit to anything.',
]

const subjectsDefault = [
  'Marriage or relationship',
  'Therapy for me',
  'Family or parenting',
  'Co-parenting after divorce',
  'Retreats',
  'Something else',
]

const inputCls =
  'w-full rounded-[6px] border-[1.5px] border-stone bg-white p-[0.7em_0.9em] text-[0.95rem] focus:border-gold focus:outline-none'

export default function ContactPage() {
  const page = usePage('contact')
  const hero = page?.hero
  const subjects = pageText(page, 'form_subjects', subjectsDefault.join(', '))
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  const formHeading = pageText(page, 'form_heading', 'Send us a message')
  const successTitle = pageText(page, 'success_title', 'Thank you.')
  const asideTitle = pageText(page, 'aside_title', 'Ready to begin?')
  const asideButton = pageText(page, 'aside_button', 'Book a consultation →')
  const [form, setForm] = useState({ first: '', last: '', email: '', phone: '', subject: subjectsDefault[0], message: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    document.title = 'Get Started | SoundHeart Counseling'
  }, [])

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await apiPost<null>('/contact', {
        name: `${form.first} ${form.last}`.trim(),
        email: form.email,
        message: `Subject: ${form.subject}\nPhone: ${form.phone || '—'}\n\n${form.message}`,
        website: form.website,
      })
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(apiErrorMessage(err, 'Something went wrong. Please try again or call us.'))
    }
  }

  return (
    <>
      <HeroBand
        eyebrow={hero?.eyebrow ?? 'Contact'}
        title={hero?.title ?? "Let's take the first step together"}
        lead={hero?.lead ?? "Have a question, or want to tell us a little about what's going on? Send a note and we'll help you find the right path."}
      />

      <section className="pb-16">
        <div className="mx-auto max-w-[1000px] px-[26px]">
          <ImgPh label="PHOTO PLACEHOLDER, a warm, welcoming image" src={pageImage(page, 'hero')} className="my-10" />

          {/* How it works */}
          <h2 className="text-center font-serif text-[1.7rem] font-medium text-navy">How it works</h2>
          <div className="mt-7 grid grid-cols-3 gap-5 max-[720px]:grid-cols-1">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-[16px] border border-stone bg-white p-6">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-navy font-bold text-ivory">{i + 1}</div>
                <h3 className="mb-1 font-serif text-[1.2rem] font-medium text-navy">{s.title}</h3>
                <p className="m-0 text-[0.95rem] leading-[1.6] text-[#55606b]">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Fees and investment */}
          <div className="mt-10 rounded-[16px] border border-stone bg-white p-7 max-[560px]:p-5">
            <h2 className="mb-2 font-serif text-[1.4rem] font-medium text-navy">Fees and investment</h2>
            {fees.map((p) => (
              <p key={p} className="mb-2 text-[1rem] leading-[1.7] text-[#4a5550] last:mb-0">{p}</p>
            ))}
            <p className="mt-4">
              <Link to="/faq" className="border-b-2 border-gold font-bold text-navy no-underline">
                See common questions →
              </Link>
            </p>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-[1000px] grid-cols-[1.2fr_0.8fr] items-start gap-10 px-[26px] max-[820px]:grid-cols-1">
          {/* Form */}
          <div className="rounded-card border border-stone bg-white p-8 max-[560px]:p-6">
            <h2 className="mb-4 text-[1.4rem]">{formHeading}</h2>

            {status === 'sent' ? (
              <div className="rounded-[8px] border border-[#cfe6d4] bg-[#eef7f0] p-6 text-center">
                <p className="m-0 font-serif text-[1.25rem] text-navy">{successTitle}</p>
                <div
                  className="rich mt-1 [&>p]:m-0 [&>p]:text-[#4a5550]"
                  dangerouslySetInnerHTML={{
                    __html: pageHtml(page, 'success_text', `<p>We'll be in touch soon. If it's urgent, call <a href="${site.phoneHref}">${site.phoneDisplay}</a>.</p>`),
                  }}
                />
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-3">
                {/* honeypot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => set('website', e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
                  <label className="text-[0.82rem] font-semibold text-navy">
                    First name
                    <input className={`${inputCls} mt-1`} value={form.first} onChange={(e) => set('first', e.target.value)} required />
                  </label>
                  <label className="text-[0.82rem] font-semibold text-navy">
                    Last name
                    <input className={`${inputCls} mt-1`} value={form.last} onChange={(e) => set('last', e.target.value)} />
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
                  <label className="text-[0.82rem] font-semibold text-navy">
                    Email
                    <input type="email" className={`${inputCls} mt-1`} value={form.email} onChange={(e) => set('email', e.target.value)} required />
                  </label>
                  <label className="text-[0.82rem] font-semibold text-navy">
                    Phone (optional)
                    <input className={`${inputCls} mt-1`} value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                  </label>
                </div>
                <label className="text-[0.82rem] font-semibold text-navy">
                  What brings you here?
                  <select className={`${inputCls} mt-1`} value={form.subject} onChange={(e) => set('subject', e.target.value)}>
                    {subjects.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label className="text-[0.82rem] font-semibold text-navy">
                  A little about what&apos;s going on
                  <textarea className={`${inputCls} mt-1`} rows={5} value={form.message} onChange={(e) => set('message', e.target.value)} required />
                </label>

                {status === 'error' && <p className="m-0 text-[0.88rem] text-[#b3261e]">{error}</p>}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn btn-primary mt-1 justify-center disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
                <div
                  className="rich text-[0.8rem] [&>p]:m-0 [&>p]:text-[#8a929c]"
                  dangerouslySetInnerHTML={{
                    __html: pageHtml(
                      page,
                      'form_note',
                      '<p>By sending this, you agree to be contacted about your enquiry. Please do not include sensitive clinical details in this form.</p>',
                    ),
                  }}
                />
              </form>
            )}
          </div>

          {/* Aside */}
          <aside className="flex flex-col gap-5">
            <div className="rounded-card border border-stone bg-white p-6">
              <h3 className="mb-1 text-[1.2rem]">{asideTitle}</h3>
              <div
                className="rich mb-4 text-[0.95rem] [&>p]:text-[#55606b]"
                dangerouslySetInnerHTML={{
                  __html: pageHtml(page, 'aside_text', "<p>If you already know you'd like to start, the fastest way in is to book a consultation.</p>"),
                }}
              />
              <Link to="/booking" className="btn btn-primary block text-center">
                {asideButton}
              </Link>
              <p className="mt-4 text-[0.9rem] text-[#55606b]">
                Prefer to talk? Call{' '}
                <a href={site.phoneHref} className="font-bold text-gold">{site.phoneDisplay}</a>
                {site.email && (
                  <>
                    , or email{' '}
                    <a href={site.emailHref} className="font-bold text-gold">{site.email}</a>
                  </>
                )}
                .
              </p>
            </div>

            <div className="rounded-card border border-[#e9d3ad] bg-[#fff4e8] p-5 text-[0.88rem] text-[#6b5636]">
              {site.crisisNote}
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
