import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { site } from '@/config/site'
import { HeroBand, ImgPh } from './parts'
import { usePage, pageImage, pageHtml } from '@/features/site/usePage'

const sections = [
  {
    h: 'The core idea',
    p: 'Connection is a set of patterns your nervous system learned, and anything learned can be practiced into something new.',
    links: [
      { t: 'Our Approach to Relationships: The NeuroRelational Belonging Model', slug: 'neurorelational-belonging' },
      { t: 'Post-Traumatic Growth: Why There Is Hope and Healing After PTSD', slug: 'post-traumatic-growth' },
    ],
  },
  {
    h: 'The nervous system in conflict',
    p: 'When we feel unsafe with the people we love, our bodies react before our thoughts catch up. Understanding that changes everything.',
    links: [
      { t: 'Why You Keep Having the Same Fight, and the Four Patterns That Predict Trouble', slug: 'same-fight-four-horsemen' },
      { t: 'Why Does My Husband Shut Down? Understanding Emotional Withdrawal', slug: 'why-partners-shut-down' },
    ],
  },
  {
    h: 'Why relationships heal',
    p: 'Trauma is often a wound to our sense of safety with others, which is why it heals best in connection.',
    links: [
      { t: 'Why Couples Therapy Works, and When to Go', slug: 'why-couples-therapy' },
      { t: 'Why Family Therapy Matters: Healing the Whole System, Not Just One Person', slug: 'why-family-therapy' },
      { t: 'People-Pleasing, Anxiety, Perfectionism: How Childhood Trauma Shows Up in Adult Life', slug: 'childhood-trauma-in-adults' },
    ],
  },
  {
    h: 'Practicing belonging in families',
    p: 'The patterns we learned can be interrupted, so they do not have to pass to the next generation.',
    links: [
      { t: 'Parenting Differently Than You Were Raised: Breaking the Cycle', slug: 'parenting-differently' },
      { t: 'Setting Boundaries With Difficult Parents (Without Going No Contact)', slug: 'boundaries-with-difficult-parents' },
    ],
  },
]

export default function TheModelPage() {
  const page = usePage('the-model')
  const hero = page?.hero
  const body = pageHtml(page, 'body', '')

  useEffect(() => {
    document.title = 'The NeuroRelational Belonging Model: The Complete Guide | SoundHeart'
  }, [])

  return (
    <>
      <HeroBand
        eyebrow={hero?.eyebrow ?? 'Complete guide'}
        title={hero?.title ?? 'The NeuroRelational Belonging Model: The Complete Guide'}
        lead={hero?.lead ?? 'Our signature approach, and the thread that connects all of our work. Connection is not a trait. It is a practice.'}
      >
        <div className="mt-6">
          <a
            href={site.simplePracticeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-[9px] bg-gold px-[1.7em] py-[0.8em] font-extrabold text-navy no-underline"
          >
            Book a session
          </a>
        </div>
      </HeroBand>

      <div className="mx-auto max-w-[760px] px-[26px]">
        <p className="mb-[6px] mt-[26px] text-[0.82rem] text-[#59636f]">
          <Link to="/" className="text-[#59636f] no-underline hover:text-gold">Home</Link> · Guides ·{' '}
          <span>The NeuroRelational Belonging Model</span>
        </p>

        <ImgPh label="PHOTO PLACEHOLDER, add a warm, on-brand image for this guide" src={pageImage(page, 'hero')} ratio="16/7" className="my-[20px]" />

        <div
          className="rich mb-8 text-[1.05rem]"
          dangerouslySetInnerHTML={{
            __html: pageHtml(
              page,
              'intro',
              '<p>At SoundHeart, everything we do runs through one idea. You do not become what you believe. You become what you repeatedly practice, and what you practice, in the end, is belonging. This guide gathers the writing that explains our approach and how it shapes our work with couples, families, and individuals.</p>',
            ),
          }}
        />

        {sections.map((s) => (
          <section key={s.h} className="mb-8">
            <h2 className="mb-1 font-serif text-[1.5rem] font-medium text-navy">{s.h}</h2>
            <p className="mb-4 text-[#55606b]">{s.p}</p>
            <div className="grid grid-cols-1 gap-3">
              {s.links.map((l) => (
                <Link
                  key={l.slug}
                  to={`/articles/${l.slug}`}
                  className="flex items-center justify-between gap-3 rounded-[10px] border border-stone bg-white p-4 no-underline transition-colors hover:border-gold"
                >
                  <span className="font-semibold text-navy">{l.t}</span>
                  <span className="flex-none text-gold">→</span>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {body.trim() && <div className="rich mb-8" dangerouslySetInnerHTML={{ __html: body }} />}

        <div className="my-10 rounded-[18px] bg-navy p-[44px_30px] text-center text-ivory">
          <h2 className="m-0 mb-[0.5rem] font-serif text-[1.7rem] font-medium !text-white">
            Belonging is learned.
          </h2>
          <p className="mx-auto mb-[1.3rem] max-w-[52ch] text-[#CBD6CC]">
            Let us help you practice it. In person in the Mat-Su Valley, or by telehealth across
            Alaska.
          </p>
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
