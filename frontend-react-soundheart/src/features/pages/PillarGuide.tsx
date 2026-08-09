import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { HeroBand, ImgPh } from './parts'
import { usePage, pageImage, pageHtml, pageCta } from '@/features/site/usePage'
import pillarsData from './data/pillars.json'

interface Pillar {
  slug: string
  kicker: string
  h1: string
  lead: string
  intro: string
  sections: { h: string; p: string; links: { title: string; slug: string }[] }[]
  related: { label: string; to: string }[]
  cta: { title: string; text: string }
}

const pillars = pillarsData as Pillar[]

function LinkCard({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between gap-3 rounded-[10px] border border-stone bg-white p-4 no-underline transition-colors hover:border-gold"
    >
      <span className="font-semibold text-navy">{label}</span>
      <span className="flex-none text-gold">→</span>
    </Link>
  )
}

export default function PillarGuide({ slug }: { slug: string }) {
  const pillar = pillars.find((p) => p.slug === slug)
  const page = usePage(pillar ? pillar.slug : '')
  const hero = page?.hero

  useEffect(() => {
    if (pillar) document.title = `${pillar.h1} | SoundHeart Counseling`
  }, [pillar])

  if (!pillar) {
    return (
      <div className="mx-auto max-w-[760px] px-[26px] py-24 text-center">
        <h1 className="font-serif text-3xl text-navy">Page not found</h1>
        <Link to="/" className="mt-6 inline-block border-b-2 border-gold font-bold text-navy no-underline">
          ← Back home
        </Link>
      </div>
    )
  }

  const cta = pageCta(page, { title: pillar.cta.title, text: pillar.cta.text, buttonLabel: 'Book a session' })

  return (
    <>
      <HeroBand eyebrow={hero?.eyebrow ?? pillar.kicker} title={hero?.title ?? pillar.h1} lead={hero?.lead ?? pillar.lead}>
        <div className="mt-6">
          <a href={site.simplePracticeUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-[9px] bg-gold px-[1.7em] py-[0.8em] font-extrabold text-navy no-underline">
            Book a session
          </a>
        </div>
      </HeroBand>

      <div className="mx-auto max-w-[760px] px-[26px]">
        <p className="mb-[6px] mt-[26px] text-[0.82rem] text-[#59636f]">
          <Link to="/" className="text-[#59636f] no-underline hover:text-gold">Home</Link> · Guides ·{' '}
          <span>{pillar.h1}</span>
        </p>

        <ImgPh label="PHOTO PLACEHOLDER, add a warm, on-brand image for this guide" src={pageImage(page, 'hero')} ratio="16/7" className="my-[20px]" />

        <div
          className="rich mb-8 text-[1.05rem]"
          dangerouslySetInnerHTML={{ __html: pageHtml(page, 'intro', `<p>${pillar.intro}</p>`) }}
        />

        {pillar.sections.map((s) => (
          <section key={s.h} className="mb-8">
            <h2 className="mb-1 font-serif text-[1.5rem] font-medium text-navy">{s.h}</h2>
            {s.p && <p className="mb-4 text-[#55606b]">{s.p}</p>}
            <div className="grid grid-cols-1 gap-3">
              {s.links.map((l) => (
                <LinkCard key={l.slug} to={`/articles/${l.slug}`} label={l.title} />
              ))}
            </div>
          </section>
        ))}

        {pillar.related.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 font-serif text-[1.5rem] font-medium text-navy">Related services and guides</h2>
            <div className="grid grid-cols-1 gap-3">
              {pillar.related.map((r) => (
                <LinkCard key={r.to} to={r.to} label={r.label} />
              ))}
            </div>
          </section>
        )}

        <div className="my-10 rounded-[18px] bg-navy p-[44px_30px] text-center text-ivory">
          <h2 className="m-0 mb-[0.5rem] font-serif text-[1.7rem] font-medium !text-white">{cta.title}</h2>
          <p className="mx-auto mb-[1.3rem] max-w-[52ch] text-[#CBD6CC]">{cta.text}</p>
          <a href={site.simplePracticeUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-[10px] bg-gold px-[1.8em] py-[0.85em] font-extrabold text-navy no-underline">
            Book a session
          </a>
          <div className="mt-3">
            <Link to="/articles" className="text-[0.9rem] font-semibold text-gold-bright no-underline">
              Browse all articles →
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
