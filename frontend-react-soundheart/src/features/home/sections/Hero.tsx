import { Link } from 'react-router-dom'
import { site } from '@/config/site'

const doorways = [
  {
    title: 'Save my marriage',
    desc: 'Marriage or relationship in crisis: affairs, constant conflict, feeling like roommates, or deciding whether to stay.',
    to: '/therapy',
  },
  {
    title: 'Therapy for me',
    desc: 'Anxiety, depression, PTSD, complex trauma, abuse recovery, and first responders.',
    to: '/therapy',
  },
  {
    title: 'Family struggles',
    desc: 'Parenting, teens, estrangement, and boundaries with difficult family.',
    to: '/therapy',
  },
  {
    title: 'Co-parenting after divorce',
    desc: 'Two homes, lower conflict, and protecting your kids.',
    to: '/therapy',
  },
  {
    title: 'Addiction & recovery',
    desc: 'Understanding it, supporting a loved one, and getting help.',
    to: '/resources',
  },
  {
    title: 'I am just learning',
    desc: 'Explore our articles, guides, and the NeuroRelational model.',
    to: '/resources',
  },
]

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden py-[88px_0_84px] text-ivory"
      style={{
        padding: '88px 0 84px',
        background: 'linear-gradient(160deg,var(--navy-deep) 0%,var(--navy) 45%,#2E5A44 130%)',
      }}
    >
      <div className="wrap">
        <div className="mx-auto mb-[34px] max-w-[560px]">
          <svg
            className="heartbeat h-[70px] w-full overflow-visible"
            viewBox="0 0 560 70"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <path
              d="M0 35 H150 L168 35 L182 12 L200 58 L216 22 L232 46 L246 35 H300 L318 35 L330 20 L344 50 L356 35 H560"
              style={{ stroke: 'var(--gold-bright)' }}
            />
          </svg>
        </div>

        <p className="mb-4 text-center text-[0.78rem] font-extrabold uppercase tracking-[0.17em] text-gold-bright">
          Relationship, Trauma &amp; Family Counseling, based in the Mat-Su Valley
        </p>

        <h1 className="mx-auto max-w-[15ch] text-center text-[clamp(2.5rem,5.4vw,4rem)] font-medium !text-white">
          What brings you here today?
        </h1>

        <p className="mx-auto mt-[1.4rem] max-w-[640px] text-center text-[1.16rem] text-[#CBD6CC]">
          Choose where you are, and we will show you the way in, with the right guidance, resources,
          and support.
        </p>

        <p className="mt-[0.2rem] text-center font-serif italic text-gold-bright">
          Connection is not something you find. It is something you practice.
        </p>

        <div className="mx-auto mt-[26px] grid max-w-[900px] grid-cols-3 items-stretch gap-4 text-left max-[820px]:grid-cols-2 max-[540px]:grid-cols-1">
          {doorways.map((d) => (
            <Link
              key={d.title}
              to={d.to}
              className="group flex flex-col rounded-[14px] border border-[rgba(201,169,97,0.4)] bg-[rgba(255,255,255,0.96)] p-5 no-underline transition-transform hover:-translate-y-[3px] hover:shadow-[0_24px_50px_-28px_rgba(0,0,0,0.65)]"
            >
              <p className="m-0 mb-[0.3rem] flex items-start gap-[0.5em] font-serif text-[1.1rem] font-semibold leading-[1.3] text-navy">
                <span className="mt-[0.4em] block h-[9px] w-[9px] flex-none rounded-full bg-gold" />
                {d.title}
              </p>
              <p className="m-0 pl-[calc(9px+0.5em)] text-[0.85rem] leading-[1.45] text-[#4a5550]">
                {d.desc}
              </p>
            </Link>
          ))}
        </div>

        <p className="my-[32px_0_16px] text-center font-serif text-[1.08rem] italic text-gold-bright" style={{ margin: '32px 0 16px' }}>
          Looking for something else? Tell us what&apos;s going on.
        </p>

        <div className="text-center">
          <a href={site.simplePracticeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Book a consultation &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}
