import { Link } from 'react-router-dom'

function GoldList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 mb-[1.8rem] list-none p-0">
      {items.map((it) => (
        <li key={it} className="relative py-[0.35em] pl-6 text-[0.96rem]">
          <span className="absolute left-0 top-[0.85em] h-2 w-2 rounded-full bg-gold" />
          {it}
        </li>
      ))}
    </ul>
  )
}

function Door({
  kicker,
  title,
  lead,
  items,
  linkText,
  linkTo,
}: {
  kicker: string
  title: string
  lead: string
  items: string[]
  linkText: string
  linkTo: string
}) {
  return (
    <div className="relative overflow-hidden rounded-card border border-stone bg-white p-[44px_40px] transition-all hover:-translate-y-[3px] hover:shadow-[0_18px_40px_-22px_rgba(31,42,68,0.4)] max-[560px]:p-[32px_26px]">
      <span className="absolute inset-x-0 top-0 h-1 bg-gold" />
      <p className="text-[0.74rem] font-bold uppercase tracking-[0.2em] text-gold">{kicker}</p>
      <h3 className="my-[0.6rem_0_0.8rem] text-[1.7rem]">{title}</h3>
      <p className="mb-[1.4rem] text-[#55606b]">{lead}</p>
      <GoldList items={items} />
      <Link
        to={linkTo}
        className="border-b-2 border-gold pb-[2px] font-bold text-navy no-underline hover:text-gold"
      >
        {linkText}
      </Link>
    </div>
  )
}

export default function TwoDoors() {
  return (
    <section className="py-24 max-[560px]:py-[68px]" id="counseling">
      <div className="wrap">
        <div className="mx-auto mb-14 max-w-[640px] text-center">
          <p className="eyebrow">Wherever you&apos;re starting from</p>
          <h2 className="text-[clamp(2rem,4vw,2.6rem)]">Two ways in. The same work.</h2>
          <p className="section-lead mx-auto">
            Some people come looking for a counselor close to home. Others find the books first and
            want to go deeper. Both doors lead to the same thing, learning to practice belonging.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-7 max-[920px]:grid-cols-1">
          <Door
            kicker="For individuals, couples & families"
            title="Counseling in the Mat-Su Valley"
            lead="Focused, practical help for individuals, couples, and families, in person in the Valley or online where available."
            items={[
              'Individual therapy for anxiety, depression, trauma, and more',
              'Intensive counseling for relationships in crisis',
              'Co-parenting support after divorce',
              'Healing for disconnected families and generational trauma',
            ]}
            linkText="See how we help →"
            linkTo="/therapy"
          />
          <Door
            kicker="For the wider circle"
            title="Retreats, training & the model"
            lead="For readers, helpers, and couples anywhere who want more than a session, immersive retreats and professional training in the NeuroRelational approach."
            items={[
              'Couples and individual retreats',
              'NeuroRelational training and certification',
              'The four books that started it all',
            ]}
            linkText="Explore retreats & training →"
            linkTo="/retreats"
          />
        </div>
      </div>
    </section>
  )
}
