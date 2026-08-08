import type { ReactNode } from 'react'

const cards: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8}>
        <path d="M12 21c-4-3-8-6-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5-4 8-8 11z" />
        <path d="M12 8l-1.5 4h3L12 16" />
      </svg>
    ),
    title: 'Relationship counseling for crisis',
    body: 'When a relationship reaches a breaking point, weekly sessions can feel too slow. Intensive counseling gives couples concentrated, focused time to steady the crisis and find a way forward together.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8}>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16" cy="8" r="3" />
        <path d="M3 20c0-3 2.2-5 5-5M21 20c0-3-2.2-5-5-5" />
        <path d="M12 12v7" />
      </svg>
    ),
    title: 'Co-parenting after divorce',
    body: 'Separation ends a marriage, not a family. We help former partners learn to work together as parents, lowering the conflict children feel and building a calm, workable partnership around them.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8}>
        <circle cx="12" cy="4" r="2" />
        <circle cx="7" cy="15" r="2" />
        <circle cx="17" cy="15" r="2" />
        <path d="M12 6v4M12 10c0 3-3 2.5-4 5M12 10c0 3 3 2.5 4 5" />
      </svg>
    ),
    title: 'Healing families & generational trauma',
    body: 'Some patterns are handed down long before anyone chooses them. We help disconnected and broken families reconnect, and interrupt the trauma that passes quietly from one generation to the next.',
  },
]

export default function Services() {
  return (
    <section className="bg-stone py-24 max-[560px]:py-[68px]" id="services">
      <div className="wrap">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="eyebrow">Our NeuroRelational Belonging approach</p>
          <h2 className="text-[clamp(2rem,4vw,2.6rem)]">Focused help for relationships and families</h2>
          <p className="section-lead mx-auto">
            Everything we do flows from one idea. Connection is not something you find, it is
            something you practice. Our NeuroRelational Belonging approach helps calm the nervous
            system, so that people bound together in a marriage, a family, or after divorce can feel
            safe with each other again and find their way back.
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

        <p className="mx-auto mt-9 max-w-[640px] text-center text-[0.98rem] font-semibold text-[#59636f]">
          Also offering individual therapy for anxiety, depression, PTSD, ADHD, and neurodivergent
          and autism support.
        </p>
      </div>
    </section>
  )
}
