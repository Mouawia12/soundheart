import { Link } from 'react-router-dom'
import { site } from '@/config/site'

const links = [
  { label: 'Services & areas we serve →', to: '/therapy' },
  { label: 'Marriage & couples guide →', to: '/therapy' },
  { label: 'Trauma & PTSD guide →', to: '/therapy' },
  { label: 'The NeuroRelational model →', to: '/the-model' },
  { label: 'Family & parenting guide →', to: '/therapy' },
  { label: 'Frequently asked questions →', to: '/faq' },
]

export default function GettingStarted() {
  return (
    <section className="border-t border-stone bg-white py-[66px]" id="getting-started">
      <div className="wrap">
        <p className="m-0 mb-2 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-gold">
          Getting started
        </p>
        <h2 className="m-0 mb-4 font-serif text-[clamp(1.6rem,3.4vw,2.2rem)] font-medium leading-[1.15] text-navy">
          What to expect at your first session
        </h2>
        <p className="m-0 mb-[0.9rem] max-w-[66ch] text-[1.08rem] leading-[1.8] text-ink">
          Reaching out is the hardest step, so we keep the first one simple. Your first session is an
          unhurried conversation to understand what brought you in and what you are hoping for. There
          is no pressure to tell your whole story at once, and it is also your chance to see whether
          we are the right fit, because the relationship between you and your counselor matters more
          than anything else.
        </p>
        <p className="m-0 mb-[1.6rem] max-w-[66ch] text-[1.08rem] leading-[1.8] text-ink">
          Sessions run about fifty minutes, in person in the Mat-Su Valley or online where available,
          and we will explain confidentiality and next steps clearly along the way.
        </p>
        <div className="grid gap-[14px] [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="block rounded-[11px] border border-stone bg-ivory p-[15px_17px] font-semibold text-navy no-underline transition-colors hover:border-gold"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p className="mt-[26px]">
          <a href={site.simplePracticeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Book a consultation
          </a>
        </p>
      </div>
    </section>
  )
}
