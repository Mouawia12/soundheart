import type { ReactNode } from 'react'

const cards: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8}>
        <path d="M12 21c-4-3-8-6-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5-4 8-8 11z" />
      </svg>
    ),
    title: 'Couples retreats',
    body: 'Focused, unhurried days for two people to step out of old patterns and practice new ones together, with guidance the whole way through.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
      </svg>
    ),
    title: 'Individual retreats',
    body: 'Space to reset your own nervous system, for people ready to do the personal work that everything else is built on.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8}>
        <path d="M4 5h16v11H4z" />
        <path d="M4 16l8 4 8-4" />
        <path d="M9 9h6" />
      </svg>
    ),
    title: 'Professional training',
    body: 'For therapists, coaches, and helpers: learn the NeuroRelational model and earn certification to bring it into your own practice.',
  },
]

export default function Retreats() {
  return (
    <section className="py-24 max-[560px]:py-[68px]" id="retreats">
      <div className="wrap">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="eyebrow">Retreats &amp; training</p>
          <h2 className="text-[clamp(2rem,4vw,2.6rem)]">Go deeper than a session</h2>
          <p className="section-lead mx-auto">
            Immersive time to practice, and a path for the helpers who want to carry this work
            forward.
          </p>
        </div>

        <div className="mt-[52px] grid grid-cols-3 gap-[26px] max-[920px]:grid-cols-1">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-card border border-stone bg-white p-[36px_32px] transition-all hover:-translate-y-[3px] hover:shadow-[0_16px_36px_-22px_rgba(31,42,68,0.4)]"
            >
              <div className="mb-[18px] flex h-12 w-12 items-center justify-center rounded-full bg-stone [&_svg]:h-6 [&_svg]:w-6 [&_svg]:stroke-gold [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round]">
                {c.icon}
              </div>
              <h3 className="mb-2 text-[1.32rem]">{c.title}</h3>
              <p className="m-0 text-[0.96rem] text-[#55606b]">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
